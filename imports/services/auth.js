import 'angular-meteor';

const name = 'auth';
export default name;

angular.module(name, [
  'angular-meteor.mixer',
  'angular-meteor.scope',
  'angular-meteor.core',
  'angular-meteor.view-model',
  'angular-meteor.reactive'
])

/*
  A mixin which provides us with authentication related methods and properties.
  This mixin comes in a seperate package called `angular-meteor-auth`. Note that `accounts-base`
  package needs to be installed in order for this module to work, otherwise an error will be thrown.
 */
.factory('$$Auth', [
  '$Mixer',
  '$log',
  '$q',

function($Mixer, $log, $q) {
  const Accounts = (Package['accounts-base'] || {}).Accounts;

  if (!Accounts) {
    throw Error(
      '`angular-meteor.auth` module requires `accounts-base` package, ' +
      'please run `meteor add accounts-base` before use'
    );
  }

  const errors = {
    required: 'AUTH_REQUIRED',
    forbidden: 'FORBIDDEN'
  };

  function $$Auth(vm = this) {
    // Reset auth properties
    this.autorun(() => {
      // Note that we use Meteor and not Accounts since the following methods are
      // not available in older versions of `accounts-base` meteor package
      vm.currentUser = Meteor.user();
      vm.currentUserId = Meteor.userId();
      vm.isLoggingIn = Meteor.loggingIn();
    });
  }

  // Waits for user to finish the login process. Gets an optional validation function which
  // will validate if the current user is valid or not. Returns a promise which will be rejected
  // once login has failed or user is not valid, otherwise it will be resolved with the current
  // user
  $$Auth.$awaitUser = function(validate) {
    validate = validate ? this.$bindToContext($Mixer.caller, validate) : () => true;

    if (!_.isFunction(validate)) {
      throw Error('argument 1 must be a function');
    }

    const deferred = this.$$defer();

    // If user is already logged in resolve the promise immediately to prevent an
    // unnecessary computation
    if (this.currentUser) {
      deferred.resolve(this.currentUser);
      // Keep the schema of the promise consistent
      deferred.promise.stop = angular.noop;
      return deferred.promise;
    }

    // Note the promise is being fulfilled in the next event loop to avoid
    // nested computations, otherwise the outer computation will cancel the
    // inner one once the scope has been destroyed which will lead to subscription
    // failures. Happens mainly after resolving a route.
    const computation = this.autorun((computation) => {
      if (this.getReactively('isLoggingIn')) return;
      // Stop computation once a user has logged in
      computation.stop();

      if (!this.currentUser) return this.$$afterFlush(deferred.reject, errors.required);

      $q.when(validate(this.currentUser)).then(isValid => {
        // Resolve the promise if validation has passed
        if (isValid === true) {
          this.$$afterFlush(deferred.resolve, this.currentUser);
        }
        else {
          return $q.reject(isValid);
        }
      }).catch(isValid => {
        let error;

        if (_.isString(isValid) || isValid instanceof Error) {
          error = isValid;
        }
        else {
          error = errors.forbidden;
        }

        this.$$afterFlush(deferred.reject, error);
      });
    });

    deferred.promise.stop = computation.stop.bind(computation);
    return deferred.promise;
  };

  // Calls a function with the provided args after flush
  $$Auth.$$afterFlush = function(fn, ...args) {
    if (_.isString(fn)) {
      fn = this[fn];
    }

    return Tracker.afterFlush(fn.bind(this, ...args));
  };

  // API v0.2.0
  // Aliases with small modificatons

  // No validation
  // Silent error
  $$Auth.$waitForUser = function() {
    // Silent error
    return this.$awaitUser().catch((err) => {
      $log.debug(`user login has failed (${err})`);
    });
  };

  // No validation
  $$Auth.$requireUser = function() {
    return this.$awaitUser();
  };

  // Full functionality
  $$Auth.$requireValidUser = function(...args) {
    return this.$awaitUser(...args);
  };

  return $$Auth;
}])

/*
  External service for syntactic sugare.
  Originally created as UI-router's resolve handler.
 */
.service('$auth', [
  '$rootScope',
  '$$Auth',

function($rootScope, $$Auth) {
  // Note that services are initialized once we call them which means that the mixin
  // will be available by then
  _.keys($$Auth).forEach((k) => {
    const stripped = k.substr(1);
    // Not using bind() so it would be testable
    this[stripped] = (...args) => $rootScope[k](...args);
  });
}])

.run([
  '$Mixer',
  '$$Auth',

function($Mixer, $$Auth) {
  $Mixer.mixin($$Auth);
}]);
