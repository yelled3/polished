(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.polished = global.polished || {})));
}(this, (function (exports) { 'use strict';

//      

// @private
function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//      

var deprecated = {
  'mixins/placeholder': {
    version: '3.0',
    guidance: 'You should use the %c::placeholder pseudo-element%c instead.'
  },
  'mixins/selection': {
    version: '3.0',
    guidance: 'You should use the %c::selection pseudo-element%c instead.'
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};



















var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};





var taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};









var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

//      

function formatMessage(type, messageBody, moduleName, modulePath) {
  var header = '%c \u2728 ' + type.toUpperCase() + ' \u2728 ---- ' + modulePath + '.js --';

  var body = '%c\n\n' + moduleName + ' %c' + messageBody + '\n  ';

  var info = '%c\nPlease see the documentation at %chttps://polished.js.org/docs/#' + moduleName + '%c for more information.';

  return '' + header + body + info;
}

// Styles
var headerStyles = 'font-weight: bold; color: black';
var docStyles = function docStyles(color) {
  return 'color: ' + color + '; line-height: 1.4';
};
var baseStyles = 'color: black; font-size: 12px';

/**
 * Formats and generates validation messages for polished modules
 * @private
 */
function message(type, messageBody, modulePath) {
  var additionalStyles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  var moduleNameMatch = modulePath.split('/');
  var moduleName = moduleNameMatch ? moduleNameMatch[1] : modulePath;
  var formattedMessage = formatMessage(type, messageBody, moduleName, modulePath);

  var messageStyles = [baseStyles + '; font-weight: bold', baseStyles].concat(toConsumableArray(additionalStyles), [docStyles('gray'), docStyles('blue'), docStyles('gray')]);

  if (type === 'error') {
    var _console;

    // eslint-disable-next-line no-console
    (_console = console).error.apply(_console, [formattedMessage, headerStyles].concat(toConsumableArray(messageStyles)));
  } else {
    var _console2;

    // eslint-disable-next-line no-console
    (_console2 = console).warn.apply(_console2, [formattedMessage, headerStyles].concat(toConsumableArray(messageStyles)));
  }
}

//      
/**
 * Handles deprecation validation of polished modules.
 * @private
 */
function deprecationCheck(modulePath) {
  var deprecationInfo = deprecated[modulePath];
  if (deprecationInfo) {
    var messageBody = 'will be deprecated as of %cversion ' + deprecationInfo.version + '%c of \u2728 polished. ' + deprecationInfo.guidance;
    var additionalStyles = ['color: black; font-size: 12px; font-weight: bold', 'color: black; font-size: 12px', 'color: black; font-size: 12px; font-weight: bold', 'color: black; font-size: 12px'];
    message('warning', messageBody, modulePath, additionalStyles);
  }
  return true;
}

//      
/**
 * Handles arrity validation of polished modules.
 * @private
 */
function validateArrity(modulePath, types, args) {
  var arrity = void 0;
  if (!types) {
    arrity = 0;
  } else {
    arrity = types.length ? types.length : 1;
  }
  if (args.length > arrity) {
    message('warning', 'expects a maximum of %c' + arrity + ' ' + (arrity === 1 ? 'parameter' : 'parameters') + '%c. However, you passed %c' + args.length + ' ' + (args.length === 1 ? 'parameter' : 'parameters') + '%c. ' + (args.length - arrity === 1 ? 'This additional parameter was' : 'These additional parameters were') + ' ignored.', modulePath, ['color: black; font-size: 12px; font-weight: bold; color: green', 'color: black; font-size: 12px', 'color: black; font-size: 12px; font-weight: bold; color: goldenrod', 'color: black; font-size: 12px']);
  }
  return true;
}

//      

/**
 * @private returns if valud is a valid CSS direction
 */

var directions = ['top', 'right', 'bottom', 'left'];

function validateDirection(value) {
  return directions.indexOf(value.toLowerCase()) >= 0;
}

//      

/**
 * Returns the unit from a given CSS value. (or null if an invalid string was passed)
 */

var units = ['%', 'ch', 'cm', 'em', 'ex', 'ic', 'in', 'mm', 'lh', 'pc', 'pt', 'px', 'rem', 'rlh', 'vh', 'vi', 'vb', 'q', 'vmax', 'vmin', 'vw'];

var measureKeywords = ['auto', 'max-content', 'min-content', 'fill-available', 'fit-content', 'inherit', 'initial', 'unset'];

function validateKeyword(value) {
  return measureKeywords.indexOf(value) >= 0;
}

function validateUnit(value) {
  if (typeof value !== 'string') return null;
  var unit = value.replace(/[^a-zA-Z-%]/g, '');
  return units.indexOf(unit) >= 0 ? unit : null;
}

//      
/**
 * Handles type validation of polished modules.
 * @private
 */

// Styles
var requiredStyles = ['color: black; font-size: 12px; font-weight: bold', 'color: black; font-size: 12px', 'color: green; font-size: 12px; font-weight: bold', 'color: black; font-size: 12px', 'color: green; font-size: 12px; font-style: italic', 'color: black; font-size: 12px', 'color: red; font-size: 12px; font-weight: bold', 'color: black; font-size: 12px'];

var expectedStyles = [].concat(requiredStyles, ['color: red; font-size: 12px; font-style: italic', 'color: black; font-size: 12px']);

function validateArray(type, arg) {
  if (type.min && type.max) {
    return Array.isArray(arg) && arg.length > type.min - 1 && arg.length < type.max - 1;
  }
  if (type.min) {
    return Array.isArray(arg) && arg.length > type.min - 1;
  }
  if (type.max) {
    return Array.isArray(arg) && arg.length > type.max - 1;
  }
  return Array.isArray(arg);
}

function typeCheck(typeInfo, arg) {
  if (Array.isArray(typeInfo.type)) {
    var validationStatus = false;
    typeInfo.type.forEach(function (type) {
      validationStatus = validationStatus || typeCheck(_extends({}, typeInfo, { type: type }), arg);
    });
    return validationStatus;
  }

  switch (typeInfo.type) {
    case 'array':
      return validateArray(typeInfo, arg);
    case 'object':
      return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
    case 'enumerable':
      if (Array.isArray(typeInfo.map)) {
        return typeInfo.map.indexOf(arg) >= 0;
      }
      return typeInfo.map[arg];
    case 'cssDirection':
      return validateDirection(arg);
    case 'cssMeasure':
      return validateUnit(arg) || validateKeyword(arg);
    case 'cssLength':
      return validateUnit(arg);
    case '%':
    case 'ch':
    case 'cm':
    case 'em':
    case 'ex':
    case 'ic':
    case 'in':
    case 'mm':
    case 'lh':
    case 'pc':
    case 'pt':
    case 'px':
    case 'rem':
    case 'rlh':
    case 'vh':
    case 'vi':
    case 'vb':
    case 'q':
    case 'vmax':
    case 'vmin':
    case 'vw':
      return typeInfo.type === validateUnit(arg);
    default:
      // eslint-disable-next-line valid-typeof
      return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === typeInfo.type;
  }
}

function ordinalSuffix(index) {
  switch (index) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

function generateMessages(modulePath, typeInfo, arg, index) {
  console.log(arg);
  if ((arg || arg) && !typeCheck(typeInfo, arg)) {
    var messageBody = void 0;
    if (index >= 0) {
      messageBody = 'expects a %c' + (index + 1) + ordinalSuffix(index + 1) + ' parameter%c(%c' + typeInfo.key + '%c: %c' + typeInfo.type + '%c). However, you passed (%c\'' + arg + '\'%c:%c' + (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) + '%c) instead.';
    } else {
      messageBody = 'expects a %cparameter%c(%c' + typeInfo.key + '%c: %c' + typeInfo.type + '%c). However, you passed (%c\'' + arg + '\'%c:%c' + (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) + '%c) instead.';
    }
    message('error', messageBody, modulePath, expectedStyles);
    return false;
  }
  if (!arg && arg !== 0 && typeInfo.required) {
    var _messageBody = void 0;
    if (index >= 0) {
      _messageBody = 'requires a %c' + (index + 1) + ordinalSuffix(index + 1) + ' parameter%c(%c' + typeInfo.key + '%c: %c' + typeInfo.type + '%c). However, you did not pass %c' + typeInfo.key + '%c.';
    } else {
      _messageBody = 'requires a %cparameter%c(%c' + typeInfo.key + '%c: %c' + typeInfo.type + '%c). However, you did not pass %c' + typeInfo.key + '%c.';
    }
    message('error', _messageBody, modulePath, requiredStyles);
    return false;
  }
  return true;
}

function validateTypes(modulePath, types, args) {
  if (Array.isArray(types)) {
    var returnStatus = true;
    types.forEach(function (type, index) {
      returnStatus = !returnStatus ? returnStatus : generateMessages(modulePath, type, args[index], index);
    });
    return returnStatus;
  } else {
    return generateMessages(modulePath, types, args[0]);
  }
}

//      
function setValidationStatus(currentStatus, newStatus) {
  return !currentStatus ? currentStatus : newStatus;
}

function unpackObject(args, types) {
  var argsArray = [];
  types.forEach(function (type) {
    argsArray.push(args[type.key]);
  });
  return argsArray;
}

/**
 * Handles validation of polished modules.
 * @private
 */
function polish(_ref) {
  var modulePath = _ref.modulePath,
      types = _ref.types,
      errReturn = _ref.errReturn;

  return function validateModule(module) {
    // eslint-disable-next-line no-console
    if (typeof module !== 'function') {
      console.error('You must submit a valid function to be ✨ polished errors.');
    }

    return function validateInput() {
      var isDev = process.env.NODE_ENV !== 'production';
      /* istanbul ignore next */
      if (isDev) {
        deprecationCheck(modulePath);
      }

      var isValid = true;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var unpackedArgs = _typeof(args[0]) === 'object' && args[0] !== null ? unpackObject(args[0], types) : args;

      /* istanbul ignore next */
      if (isDev) {
        isValid = setValidationStatus(isValid, validateArrity(modulePath, types, unpackedArgs));
      }

      if (types) {
        isValid = setValidationStatus(isValid, validateTypes(modulePath, types, unpackedArgs));
      }

      var errReturnValue = errReturn || {};

      /* istanbul ignore next */
      if (!isDev && !isValid) {
        // eslint-disable-next-line no-console
        console.error('You have experience 1 or more minified ✨ polished errors. You can use the non-minified dev environment for full errors and additional helpful warnings.');
      }

      return isValid ? module.apply(undefined, toConsumableArray(unpackedArgs)) : errReturnValue;
    };
  };
}

//      
var positionMap = ['Top', 'Right', 'Bottom', 'Left'];

function generateProperty(property, position) {
  if (!property) return position.toLowerCase();
  var splitProperty = property.split('-');
  if (splitProperty.length > 1) {
    splitProperty.splice(1, 0, position);
    return splitProperty.reduce(function (acc, val) {
      return '' + acc + capitalizeString(val);
    });
  }
  var joinedProperty = property.replace(/([a-z])([A-Z])/g, '$1' + position + '$2');
  return property === joinedProperty ? '' + property + position : joinedProperty;
}

function generateStyles(property, valuesWithDefaults) {
  var styles = {};
  for (var i = 0; i < valuesWithDefaults.length; i += 1) {
    if (valuesWithDefaults[i] && i < 4) {
      styles[generateProperty(property, positionMap[i])] = valuesWithDefaults[i];
    }
  }
  return styles;
}

/**
 * A helper that enables shorthand for direction based properties. It accepts a property (hyphenated or camelCased) and up to four values that map to top, right, bottom, and left, respectively. You can optionally pass an empty string to get only the directional values as properties. You can also optionally pass a null argument for a directional value to ignore it.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...directionalProperty('padding', '12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${directionalProperty('padding', '12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'paddingTop': '12px',
 *   'paddingRight': '24px',
 *   'paddingBottom': '36px',
 *   'paddingLeft': '48px'
 * }
 */

function directionalProperty(property) {
  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  //  prettier-ignore
  // $FlowIgnoreNextLine doesn't understand destructuring with chained defaults.
  var firstValue = values[0],
      _values$ = values[1],
      secondValue = _values$ === undefined ? firstValue : _values$,
      _values$2 = values[2],
      thirdValue = _values$2 === undefined ? firstValue : _values$2,
      _values$3 = values[3],
      fourthValue = _values$3 === undefined ? secondValue : _values$3;

  var valuesWithDefaults = [firstValue, secondValue, thirdValue, fourthValue];
  return generateStyles(property, valuesWithDefaults);
}

var directionalProperty$1 = polish({
  modulePath: 'helpers/directionalProperty',
  types: [{ type: 'string' }, { type: ['string', 'cssMeasure'] }, { type: ['string', 'cssMeasure'] }, { type: ['string', 'cssMeasure'] }, { type: ['string', 'cssMeasure'] }]
})(directionalProperty);

//      

/**
 * Check if a string ends with something
 * @private
 */
var endsWith = function (string, suffix) {
  return string.substr(-suffix.length) === suffix;
};

//      
/**
 * Strip the unit from a given CSS value, returning just the number.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   '--dimension': stripUnit('100px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   --dimension: ${stripUnit('100px')}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   '--dimension': 100
 * }
 */

function stripUnit(value) {
  var unitlessValue = parseFloat(value);
  if (isNaN(unitlessValue)) return value;
  return unitlessValue;
}

var stripUnit$1 = polish({
  modulePath: 'helpers/stripUnit',
  types: {
    key: 'value',
    type: ['cssMeasure', 'number', 'string'],
    required: true
  },
  errReturn: ''
})(stripUnit);

//      

/**
 * Factory function that creates pixel-to-x converters
 * @private
 */
var pxtoFactory$1 = function pxtoFactory$1(to) {
  return function (pxval) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '16px';

    var newPxval = pxval;
    var newBase = base;
    if (typeof pxval === 'string') {
      if (!endsWith(pxval, 'px')) {
        throw new Error('Expected a string ending in "px" or a number passed as the first argument to ' + to + '(), got "' + pxval + '" instead.');
      }
      newPxval = stripUnit$1(pxval);
    }

    if (typeof base === 'string') {
      if (!endsWith(base, 'px')) {
        throw new Error('Expected a string ending in "px" or a number passed as the second argument to ' + to + '(), got "' + base + '" instead.');
      }
      newBase = stripUnit$1(base);
    }

    if (typeof newPxval === 'string') {
      throw new Error('Passed invalid pixel value ("' + pxval + '") to ' + to + '(), please pass a value like "12px" or 12.');
    }

    if (typeof newBase === 'string') {
      throw new Error('Passed invalid base value ("' + base + '") to ' + to + '(), please pass a value like "12px" or 12.');
    }

    return '' + newPxval / newBase + to;
  };
};

//      
/**
 * Convert pixel value to ems. The default base value is 16px, but can be changed by passing a
 * second argument to the function.
 * @function
 * @param {string|number} pxval
 * @param {string|number} [base='16px']
 * @example
 * // Styles as object usage
 * const styles = {
 *   'height': em('16px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   height: ${em('16px')}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   'height': '1em'
 * }
 */

var em = pxtoFactory$1('em');

//      
var ratioNames = {
  minorSecond: 1.067,
  majorSecond: 1.125,
  minorThird: 1.2,
  majorThird: 1.25,
  perfectFourth: 1.333,
  augFourth: 1.414,
  perfectFifth: 1.5,
  minorSixth: 1.6,
  goldenSection: 1.618,
  majorSixth: 1.667,
  minorSeventh: 1.778,
  majorSeventh: 1.875,
  octave: 2,
  majorTenth: 2.5,
  majorEleventh: 2.667,
  majorTwelfth: 3,
  doubleOctave: 4
};

/** */

/**
 * Establish consistent measurements and spacial relationships throughout your projects by incrementing up or down a defined scale. We provide a list of commonly used scales as pre-defined variables, see below.
 * @example
 * // Styles as object usage
 * const styles = {
 *    // Increment two steps up the default scale
 *   'fontSize': modularScale(2)
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *    // Increment two steps up the default scale
 *   fontSize: ${modularScale(2)}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   'fontSize': '1.77689em'
 * }
 */
function modularScale(steps) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1em';
  var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'perfectFourth';

  var realBase = typeof base === 'string' ? stripUnit$1(base) : base;
  var realRatio = typeof ratio === 'string' ? ratioNames[ratio] : ratio;

  return realBase * Math.pow(realRatio, steps) + 'em';
}

var modularScale$1 = polish({
  modulePath: 'helpers/modularScale',
  types: [{ type: 'number', required: true }, { type: ['number', 'em'] }, { type: ['number', 'enumberable'], map: ratioNames }],
  errReturn: ''
})(modularScale);

//      
/**
 * Convert pixel value to rems. The default base value is 16px, but can be changed by passing a
 * second argument to the function.
 * @function
 * @param {string|number} pxval
 * @param {string|number} [base='16px']
 * @example
 * // Styles as object usage
 * const styles = {
 *   'height': rem('16px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   height: ${rem('16px')}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   'height': '1rem'
 * }
 */
var rem = pxtoFactory$1('rem');

//      
/**
 * CSS to contain a float (credit to CSSMojo).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *    ...clearFix(),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${clearFix()}
 * `
 *
 * // CSS as JS Output
 *
 * '&::after': {
 *   'clear': 'both',
 *   'content': '""',
 *   'display': 'table'
 * }
 */

function clearFix() {
  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '&';

  return defineProperty({}, parent + '::after', {
    clear: 'both',
    content: '""',
    display: 'table'
  });
}

var clearFix$1 = polish({
  modulePath: 'mixins/clearFix',
  types: { type: 'string' }
})(clearFix);

//      
/**
 * CSS to represent truncated text with an ellipsis.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...ellipsis('250px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${ellipsis('250px')}
 * `
 *
 * // CSS as JS Output
 *
 * div: {
 *   'display': 'inline-block',
 *   'maxWidth': '250px',
 *   'overflow': 'hidden',
 *   'textOverflow': 'ellipsis',
 *   'whiteSpace': 'nowrap',
 *   'wordWrap': 'normal'
 * }
 */

function ellipsis() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '100%';

  return {
    display: 'inline-block',
    maxWidth: width,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordWrap: 'normal'
  };
}

var ellipsis$1 = polish({
  modulePath: 'mixins/ellipsis',
  types: { type: 'cssMeasure' }
})(ellipsis);

//      
/**
 * Handles custom validation of polished modules.
 * @private
 */

function isEnforceable(modulePath, validation) {
  if (!validation.enforce) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production') {
      message('error', validation.msg, modulePath);
    }
    return false;
  }
  return true;
}

function setValidationStatus$1(currentStatus, newStatus) {
  return !currentStatus ? currentStatus : newStatus;
}

function customValidation(modulePath, validations) {
  if (Array.isArray(validations)) {
    var validationStatus = true;
    validations.forEach(function (validation) {
      validationStatus = setValidationStatus$1(validationStatus, isEnforceable(modulePath, validation));
    });
    return validationStatus;
  } else {
    return isEnforceable(modulePath, validations);
  }
}

//      
function generateFileReferences(fontFilePath, fileFormats) {
  var fileFontReferences = fileFormats.map(function (format) {
    return 'url("' + fontFilePath + '.' + format + '")';
  });
  return fileFontReferences.join(', ');
}

function generateLocalReferences(localFonts) {
  var localFontReferences = localFonts.map(function (font) {
    return 'local("' + font + '")';
  });
  return localFontReferences.join(', ');
}

function generateSources(fontFilePath, localFonts, fileFormats) {
  var fontReferences = [];
  if (localFonts) fontReferences.push(generateLocalReferences(localFonts));
  if (fontFilePath) {
    fontReferences.push(generateFileReferences(fontFilePath, fileFormats));
  }
  return fontReferences.join(', ');
}

/**
 * CSS for a @font-face declaration.
 *
 * @example
 * // Styles as object basic usage
 * const styles = {
 *    ...fontFace({
 *      'fontFamily': 'Sans-Pro'
 *      'fontFilePath': 'path/to/file'
 *    })
 * }
 *
 * // styled-components basic usage
 * injectGlobal`${
 *   fontFace({
 *     'fontFamily': 'Sans-Pro'
 *     'fontFilePath': 'path/to/file'
 *   }
 * )}`
 *
 * // CSS as JS Output
 *
 * '@font-face': {
 *   'fontFamily': 'Sans-Pro',
 *   'src': 'url("path/to/file.eot"), url("path/to/file.woff2"), url("path/to/file.woff"), url("path/to/file.ttf"), url("path/to/file.svg")',
 * }
 */

function fontFace(fontFamily, fontFilePath, fontStretch, fontStyle, fontVariant, fontWeight) {
  var fileFormats = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : ['eot', 'woff2', 'woff', 'ttf', 'svg'];
  var localFonts = arguments[7];
  var unicodeRange = arguments[8];

  if (!customValidation('mixins/fontFace', {
    enforce: fontFilePath || localFonts,
    msg: 'fontFace expects either the path to the font file(s) or a name of a local copy. However, you provided neither.'
  })) {
    return {};
  }

  var fontFaceDeclaration = {
    '@font-face': {
      fontFamily: fontFamily,
      src: generateSources(fontFilePath, localFonts, fileFormats),
      unicodeRange: unicodeRange,
      fontStretch: fontStretch,
      fontStyle: fontStyle,
      fontVariant: fontVariant,
      fontWeight: fontWeight
    }
  };

  // Removes undefined fields for cleaner css object.
  return JSON.parse(JSON.stringify(fontFaceDeclaration));
}
var fontFace$1 = polish({
  modulePath: 'mixins/fontFace',
  types: [{
    key: 'fontFamily',
    type: 'string',
    required: true
  }, { key: 'fontFilePath', type: 'string' }, { key: 'fontStretch', type: 'string' }, { key: 'fontStyle', type: 'string' }, { key: 'fontVariant', type: 'string' }, { key: 'fontWeight', type: 'string' }, { key: 'fileFormats', type: 'array' }, { key: 'localFonts', type: 'array' }, { key: 'unicodeRange', type: 'string' }]
})(fontFace);

//      
/**
 * CSS to hide text to show a background image in a SEO-friendly way.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   'backgroundImage': 'url(logo.png)',
 *   ...hideText(),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   backgroundImage: url(logo.png);
 *   ${hideText()};
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'backgroundImage': 'url(logo.png)',
 *   'textIndent': '101%',
 *   'overflow': 'hidden',
 *   'whiteSpace': 'nowrap',
 * }
 */

function hideText() {
  return {
    textIndent: '101%',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  };
}

var hideText$1 = polish({
  modulePath: 'mixins/hideText'
})(hideText);

//      
/**
 * Generates a media query to target HiDPI devices.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *  [hiDPI(1.5)]: {
 *    width: 200px;
 *  }
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${hiDPI(1.5)} {
 *     width: 200px;
 *   }
 * `
 *
 * // CSS as JS Output
 *
 * '@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
 *  only screen and (min--moz-device-pixel-ratio: 1.5),
 *  only screen and (-o-min-device-pixel-ratio: 1.5/1),
 *  only screen and (min-resolution: 144dpi),
 *  only screen and (min-resolution: 1.5dppx)': {
 *   'width': '200px',
 * }
 */

function hiDPI() {
  var ratio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.3;

  return '\n    @media only screen and (-webkit-min-device-pixel-ratio: ' + ratio + '),\n    only screen and (min--moz-device-pixel-ratio: ' + ratio + '),\n    only screen and (-o-min-device-pixel-ratio: ' + ratio + '/1),\n    only screen and (min-resolution: ' + Math.round(ratio * 96) + 'dpi),\n    only screen and (min-resolution: ' + ratio + 'dppx)\n  ';
}

var hiDPI$1 = polish({
  modulePath: 'mixins/hiDPI',
  types: { type: 'number' },
  errReturn: ''
})(hiDPI);

var _opinionatedRules;
var _unopinionatedRules;

//      
var opinionatedRules = (_opinionatedRules = {
  html: {
    fontFamily: 'sans-serif'
  },

  body: {
    margin: '0'
  }

}, defineProperty(_opinionatedRules, 'a:active,\n  a:hover', {
  outlineWidth: '0'
}), defineProperty(_opinionatedRules, 'button,\n  input,\n  optgroup,\n  select,\n  textarea', {
  fontFamily: 'sans-serif',
  fontSize: '100%',
  lineHeight: '1.15'
}), _opinionatedRules);

var unopinionatedRules = (_unopinionatedRules = {
  html: {
    lineHeight: '1.15',
    textSizeAdjust: '100%'
  }

}, defineProperty(_unopinionatedRules, 'article,\n  aside,\n  footer,\n  header,\n  nav,\n  section', {
  display: 'block'
}), defineProperty(_unopinionatedRules, 'h1', {
  fontSize: '2em',
  margin: '0.67em 0'
}), defineProperty(_unopinionatedRules, 'figcaption,\n  figure,\n  main', {
  display: 'block'
}), defineProperty(_unopinionatedRules, 'figure', {
  margin: '1em 40px'
}), defineProperty(_unopinionatedRules, 'hr', {
  boxSizing: 'content-box',
  height: '0',
  overflow: 'visible'
}), defineProperty(_unopinionatedRules, 'pre', {
  fontFamily: 'monospace, monospace',
  fontSize: '1em'
}), defineProperty(_unopinionatedRules, 'a', {
  'background-color': 'transparent',
  '-webkit-text-decoration-skip': 'objects'
}), defineProperty(_unopinionatedRules, 'abbr[title]', defineProperty({
  borderBottom: 'none',
  textDecoration: 'underline'
}, 'textDecoration', 'underline dotted')), defineProperty(_unopinionatedRules, 'b,\n  strong', {
  fontWeight: 'inherit'
}), defineProperty(_unopinionatedRules, 'code,\n  kbd,\n  samp', {
  fontFamily: 'monospace, monospace',
  fontSize: '1em'
}), defineProperty(_unopinionatedRules, 'dfn', {
  fontStyle: 'italic'
}), defineProperty(_unopinionatedRules, 'mark', {
  backgroundColor: '#ff0',
  color: '#000'
}), defineProperty(_unopinionatedRules, 'small', {
  fontSize: '80%'
}), defineProperty(_unopinionatedRules, 'sub,\n  sup', {
  fontSize: '75%',
  lineHeight: '0',
  position: 'relative',
  verticalAlign: 'baseline'
}), defineProperty(_unopinionatedRules, 'sub', {
  bottom: '-0.25em'
}), defineProperty(_unopinionatedRules, 'sup', {
  top: '-0.5em'
}), defineProperty(_unopinionatedRules, 'audio,\n  video', {
  display: 'inline-block'
}), defineProperty(_unopinionatedRules, 'audio:not([controls])', {
  display: 'none',
  height: '0'
}), defineProperty(_unopinionatedRules, 'img', {
  borderStyle: 'none'
}), defineProperty(_unopinionatedRules, 'svg:not(:root)', {
  overflow: 'hidden'
}), defineProperty(_unopinionatedRules, 'button,\n  input,\n  optgroup,\n  select,\n  textarea', {
  margin: '0'
}), defineProperty(_unopinionatedRules, 'button,\n  input', {
  overflow: 'visible'
}), defineProperty(_unopinionatedRules, 'button,\n  select', {
  textTransform: 'none'
}), defineProperty(_unopinionatedRules, 'button,\n  html [type="button"],\n  [type="reset"],\n  [type="submit"]', {
  '-webkit-appearance': 'button'
}), defineProperty(_unopinionatedRules, 'button::-moz-focus-inner,\n  [type="button"]::-moz-focus-inner,\n  [type="reset"]::-moz-focus-inner,\n  [type="submit"]::-moz-focus-inner', {
  borderStyle: 'none',
  padding: '0'
}), defineProperty(_unopinionatedRules, 'button:-moz-focusring,\n  [type="button"]:-moz-focusring,\n  [type="reset"]:-moz-focusring,\n  [type="submit"]:-moz-focusring', {
  outline: '1px dotted ButtonText'
}), defineProperty(_unopinionatedRules, 'fieldset', {
  border: '1px solid #c0c0c0',
  margin: '0 2px',
  padding: '0.35em 0.625em 0.75em'
}), defineProperty(_unopinionatedRules, 'legend', {
  boxSizing: 'border-box',
  color: 'inherit',
  display: 'table',
  maxWidth: '100%',
  padding: '0',
  whiteSpace: 'normal'
}), defineProperty(_unopinionatedRules, 'progress', {
  display: 'inline-block',
  verticalAlign: 'baseline'
}), defineProperty(_unopinionatedRules, 'textarea', {
  overflow: 'auto'
}), defineProperty(_unopinionatedRules, '[type="checkbox"],\n  [type="radio"]', {
  boxSizing: 'border-box',
  padding: '0'
}), defineProperty(_unopinionatedRules, '[type="number"]::-webkit-inner-spin-button,\n  [type="number"]::-webkit-outer-spin-button', {
  height: 'auto'
}), defineProperty(_unopinionatedRules, '[type="search"]', {
  '-webkit-appearance': 'textfield',
  outlineOffset: '-2px'
}), defineProperty(_unopinionatedRules, '[type="search"]::-webkit-search-cancel-button,\n  [type="search"]::-webkit-search-decoration', {
  '-webkit-appearance': 'none'
}), defineProperty(_unopinionatedRules, '::-webkit-file-upload-button', {
  '-webkit-appearance': 'button',
  font: 'inherit'
}), defineProperty(_unopinionatedRules, 'details,\n  menu', {
  display: 'block'
}), defineProperty(_unopinionatedRules, 'summary', {
  display: 'list-item'
}), defineProperty(_unopinionatedRules, 'canvas', {
  display: 'inline-block'
}), defineProperty(_unopinionatedRules, 'template', {
  display: 'none'
}), defineProperty(_unopinionatedRules, '[hidden]', {
  display: 'none'
}), _unopinionatedRules);

function mergeRules(baseRules, additionalRules) {
  var mergedRules = _extends({}, baseRules);
  Object.keys(additionalRules).forEach(function (key) {
    if (mergedRules[key]) {
      mergedRules[key] = _extends({}, mergedRules[key], additionalRules[key]);
    } else {
      mergedRules[key] = _extends({}, additionalRules[key]);
    }
  });
  return mergedRules;
}

/**
 * CSS to normalize abnormalities across browsers (normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css)
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *    ...normalize(),
 * }
 *
 * // styled-components usage
 * injectGlobal`${normalize()}`
 *
 * // CSS as JS Output
 *
 * html {
 *   fontFamily: sans-serif,
 *   lineHeight: 1.15,
 *   textSizeAdjust: 100%,
 * } ...
 */
function normalize(excludeOpinionated) {
  if (excludeOpinionated) return unopinionatedRules;
  return mergeRules(unopinionatedRules, opinionatedRules);
}

var normalize$1 = polish({
  modulePath: 'mixins/normalize',
  types: { type: 'boolean' }
})(normalize);

//      
/**
 * CSS to style the selection psuedo-element.
 *
 * ***Deprecation Warning:*** *This mixin has been deprecated and will be removed in version 3.0.*
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...placeholder({'color': 'blue'})
 * }
 *
 * // styled-components usage
 * const div = styled.input`
 *    ${placeholder({'color': 'blue'})}
 * `
 *
 * // CSS as JS Output
 *
 * 'input': {
 *   '&:-moz-placeholder': {
 *     'color': 'blue',
 *   },
 *   '&:-ms-input-placeholder': {
 *     'color': 'blue',
 *   },
 *   '&::-moz-placeholder': {
 *     'color': 'blue',
 *   },
 *   '&::-webkit-input-placeholder': {
 *     'color': 'blue',
 *   },
 * },
 */
function placeholder() {
  var _ref;

  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '&';
  var styles = arguments[1];

  return _ref = {}, defineProperty(_ref, parent + '::-webkit-input-placeholder', _extends({}, styles)), defineProperty(_ref, parent + ':-moz-placeholder', _extends({}, styles)), defineProperty(_ref, parent + '::-moz-placeholder', _extends({}, styles)), defineProperty(_ref, parent + ':-ms-input-placeholder', _extends({}, styles)), _ref;
}

var placeholder$1 = polish({
  modulePath: 'mixins/placeholder',
  types: [{ type: 'string' }, { type: 'object', required: true }]
})(placeholder);

var _templateObject = taggedTemplateLiteral(['radial-gradient(', '', '', '', ')'], ['radial-gradient(', '', '', '', ')']);

//      
/** */
function parseFallback(colorStops) {
  return colorStops[0].split(' ')[0];
}

function constructGradientValue(literals) {
  var template = '';
  for (var i = 0; i < literals.length; i += 1) {
    template += literals[i];
    // Adds leading coma if properties preceed color-stops
    if (i === 3 && (arguments.length <= i + 1 ? undefined : arguments[i + 1]) && ((arguments.length <= 1 ? undefined : arguments[1]) || (arguments.length <= 2 ? undefined : arguments[2]) || (arguments.length <= 3 ? undefined : arguments[3]))) {
      template = template.slice(0, -1);
      template += ', ' + (arguments.length <= i + 1 ? undefined : arguments[i + 1]);
      // No trailing space if color-stops is the only param provided
    } else if (i === 3 && (arguments.length <= i + 1 ? undefined : arguments[i + 1]) && !(arguments.length <= 1 ? undefined : arguments[1]) && !(arguments.length <= 2 ? undefined : arguments[2]) && !(arguments.length <= 3 ? undefined : arguments[3])) {
      template += '' + (arguments.length <= i + 1 ? undefined : arguments[i + 1]);
      // Only adds substitution if it is defined
    } else if (arguments.length <= i + 1 ? undefined : arguments[i + 1]) {
      template += (arguments.length <= i + 1 ? undefined : arguments[i + 1]) + ' ';
    }
  }
  return template.trim();
}

/**
 * CSS for declaring a radial gradient, including a fallback background-color. The fallback is either the first color-stop or an explicitly passed fallback color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...radialGradient({
 *     colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
 *     extent: 'farthest-corner at 45px 45px',
 *     position: 'center',
 *     shape: 'ellipse',
 *   })
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${radialGradient({
 *     colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
 *     extent: 'farthest-corner at 45px 45px',
 *     position: 'center',
 *     shape: 'ellipse',
 *   })}
 *`
 *
 * // CSS as JS Output
 *
 * div: {
 *   'backgroundColor': '#00FFFF',
 *   'backgroundImage': 'radial-gradient(center ellipse farthest-corner at 45px 45px, #00FFFF 0%, rgba(0, 0, 255, 0) 50%, #0000FF 95%)',
 * }
 */
function radialGradient(colorStops, extent, fallback, position, shape) {
  return {
    backgroundColor: fallback || parseFallback(colorStops),
    backgroundImage: constructGradientValue(_templateObject, position, shape, extent, colorStops.join(', '))
  };
}

var radialGradient$1 = polish({
  modulePath: 'mixins/radialGradient',
  types: [{
    key: 'colorStops',
    type: 'array',
    min: '2',
    required: true
  }, { key: 'extent', type: 'string' }, { key: 'fallback', type: 'string' }, { key: 'position', type: 'string' }, { key: 'shape', type: 'string' }]
})(radialGradient);

//      
/**
 * A helper to generate a retina background image and non-retina
 * background image. The retina background image will output to a HiDPI media query. The mixin uses
 * a _2x.png fileName suffix by default.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *  ...retinaImage('my-img')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${retinaImage('my-img')}
 * `
 *
 * // CSS as JS Output
 * div {
 *   backgroundImage: 'url(my-img.png)',
 *   '@media only screen and (-webkit-min-device-pixel-ratio: 1.3),
 *    only screen and (min--moz-device-pixel-ratio: 1.3),
 *    only screen and (-o-min-device-pixel-ratio: 1.3/1),
 *    only screen and (min-resolution: 144dpi),
 *    only screen and (min-resolution: 1.5dppx)': {
 *     backgroundImage: 'url(my-img_2x.png)',
 *   }
 * }
 */
function retinaImage(fileName, backgroundSize) {
  var extension = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'png';
  var retinaFileName = arguments[3];
  var retinaSuffix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '_2x';

  // Replace the dot at the beginning of the passed extension if one exists
  var ext = extension.replace(/^\./, '');
  var rFileName = retinaFileName ? retinaFileName + '.' + ext : '' + fileName + retinaSuffix + '.' + ext;

  return defineProperty({
    backgroundImage: 'url(' + fileName + '.' + ext + ')'
  }, hiDPI$1(), {
    backgroundImage: 'url(' + rFileName + ')',
    backgroundSize: backgroundSize
  });
}

var retinaImage$1 = polish({
  modulePath: 'mixins/retinaImage',
  types: [{
    type: 'string',
    required: true
  }, { type: 'string' }, { type: 'string' }, { type: 'string' }, { type: 'string' }]
})(retinaImage);

//      
/**
 * CSS to style the selection psuedo-element.
 *
 * ***Deprecation Warning:*** *This mixin has been deprecated and will be removed in version 3.0.*
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...selection({
 *     'backgroundColor': 'blue'
 *   }, 'section')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${selection({'backgroundColor': 'blue'}, 'section')}
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'section::-moz-selection': {
 *     'backgroundColor':'blue',
 *   },
 *   'section::selection': {
 *     'backgroundColor': 'blue',
 *   }
 * }
 */

function selection() {
  var _ref;

  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var styles = arguments[1];

  return _ref = {}, defineProperty(_ref, parent + '::-moz-selection', _extends({}, styles)), defineProperty(_ref, parent + '::selection', _extends({}, styles)), _ref;
}

var selection$1 = polish({
  modulePath: 'mixins/selection',
  types: [{ type: 'string' }, { type: 'object', required: true }]
})(selection);

//      
var functionsMap = {
  easeInBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
  easeInCirc: 'cubic-bezier(0.600,  0.040, 0.980, 0.335)',
  easeInCubic: 'cubic-bezier(0.550,  0.055, 0.675, 0.190)',
  easeInExpo: 'cubic-bezier(0.950,  0.050, 0.795, 0.035)',
  easeInQuad: 'cubic-bezier(0.550,  0.085, 0.680, 0.530)',
  easeInQuart: 'cubic-bezier(0.895,  0.030, 0.685, 0.220)',
  easeInQuint: 'cubic-bezier(0.755,  0.050, 0.855, 0.060)',
  easeInSine: 'cubic-bezier(0.470,  0.000, 0.745, 0.715)',

  easeOutBack: 'cubic-bezier(0.175,  0.885, 0.320, 1.275)',
  easeOutCubic: 'cubic-bezier(0.215,  0.610, 0.355, 1.000)',
  easeOutCirc: 'cubic-bezier(0.075,  0.820, 0.165, 1.000)',
  easeOutExpo: 'cubic-bezier(0.190,  1.000, 0.220, 1.000)',
  easeOutQuad: 'cubic-bezier(0.250,  0.460, 0.450, 0.940)',
  easeOutQuart: 'cubic-bezier(0.165,  0.840, 0.440, 1.000)',
  easeOutQuint: 'cubic-bezier(0.230,  1.000, 0.320, 1.000)',
  easeOutSine: 'cubic-bezier(0.390,  0.575, 0.565, 1.000)',

  easeInOutBack: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
  easeInOutCirc: 'cubic-bezier(0.785,  0.135, 0.150, 0.860)',
  easeInOutCubic: 'cubic-bezier(0.645,  0.045, 0.355, 1.000)',
  easeInOutExpo: 'cubic-bezier(1.000,  0.000, 0.000, 1.000)',
  easeInOutQuad: 'cubic-bezier(0.455,  0.030, 0.515, 0.955)',
  easeInOutQuart: 'cubic-bezier(0.770,  0.000, 0.175, 1.000)',
  easeInOutQuint: 'cubic-bezier(0.860,  0.000, 0.070, 1.000)',
  easeInOutSine: 'cubic-bezier(0.445,  0.050, 0.550, 0.950)'
};

/** */

/**
 * String to represent common easing functions as demonstrated here: (github.com/jaukia/easie).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   'transitionTimingFunction': timingFunctions('easeInQuad')
 * }
 *
 * // styled-components usage
 *  const div = styled.div`
 *   transitionTimingFunction: ${timingFunctions('easeInQuad')};
 * `
 *
 * // CSS as JS Output
 *
 * 'div': {
 *   'transitionTimingFunction': 'cubic-bezier(0.550,  0.085, 0.680, 0.530)',
 * }
 */

function timingFunctions(timingFunction) {
  return functionsMap[timingFunction];
}

var timingFunctions$1 = polish({
  modulePath: 'mixins/timingFunctions',
  types: {
    type: 'enumerable',
    map: functionsMap,
    required: true
  }
})(timingFunctions);

//      
/** */

var getBorderWidth = function getBorderWidth(pointingDirection, height, width) {
  switch (pointingDirection) {
    case 'top':
      return '0 ' + width / 2 + 'px ' + height + 'px ' + width / 2 + 'px';
    case 'left':
      return height / 2 + 'px ' + width + 'px ' + height / 2 + 'px 0';
    case 'bottom':
      return height + 'px ' + width / 2 + 'px 0 ' + width / 2 + 'px';
    case 'right':
    default:
      return height / 2 + 'px 0 ' + height / 2 + 'px ' + width + 'px';
  }
};

// needed for border-color
var reverseDirection = {
  left: 'Right',
  right: 'Left',
  top: 'Bottom',
  bottom: 'Top'
};

/**
 * CSS to represent triangle with any pointing direction with an optional background color. Accepts number or px values for height and width.
 *
 * @example
 * // Styles as object usage
 *
 * const styles = {
 *   ...triangle({ pointingDirection: 'right', width: '100px', height: '100px', foregroundColor: 'red' })
 * }
 *
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${triangle({ pointingDirection: 'right', width: '100px', height: '100px', foregroundColor: 'red' })}
 *
 *
 * // CSS as JS Output
 *
 * div: {
 *  'borderColor': 'transparent',
 *  'borderLeftColor': 'red !important',
 *  'borderStyle': 'solid',
 *  'borderWidth': '50px 0 50px 100px',
 *  'height': '0',
 *  'width': '0',
 * }
 */
function triangle(pointingDirection, height, width, foregroundColor) {
  var _ref;

  var backgroundColor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'transparent';

  var unitlessHeight = parseFloat(height);
  var unitlessWidth = parseFloat(width);

  return _ref = {
    borderColor: backgroundColor
  }, defineProperty(_ref, 'border' + reverseDirection[pointingDirection] + 'Color', foregroundColor), defineProperty(_ref, 'width', '0'), defineProperty(_ref, 'height', '0'), defineProperty(_ref, 'borderWidth', getBorderWidth(pointingDirection, unitlessHeight, unitlessWidth)), defineProperty(_ref, 'borderStyle', 'solid'), _ref;
}

var triangle$1 = polish({
  modulePath: 'mixins/triangle',
  types: [{
    key: 'pointingDirection',
    type: 'string',
    required: true
  }, {
    key: 'height',
    type: 'px',
    required: true
  }, {
    key: 'width',
    type: 'px',
    required: true
  }, {
    key: 'foregroundColor',
    type: 'string',
    required: true
  }, { key: 'backgroundColor', type: 'string' }]
})(triangle);

//      
var wrapKeywords = ['break-word', 'normal'];

/**
 * Provides an easy way to change the `wordWrap` property.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...wordWrap('break-word')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${wordWrap('break-word')}
 * `
 *
 * // CSS as JS Output
 *
 * const styles = {
 *   overflowWrap: 'break-word',
 *   wordWrap: 'break-word',
 *   wordBreak: 'break-all',
 * }
 */

function wordWrap() {
  var wrap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'break-word';

  var wordBreak = wrap === 'break-word' ? 'break-all' : wrap;
  return {
    overflowWrap: wrap,
    wordWrap: wrap,
    wordBreak: wordBreak
  };
}

var wordWrap$1 = polish({
  modulePath: 'mixins/wordWrap',
  types: { type: 'enumerable', map: wrapKeywords }
})(wordWrap);

//      


function colorToInt(color) {
  return Math.round(color * 255);
}

function convertToInt(red, green, blue) {
  return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
}

function hslToRgb(hue, saturation, lightness) {
  var convert = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : convertToInt;

  if (saturation === 0) {
    // achromatic
    return convert(lightness, lightness, lightness);
  }

  // formular from https://en.wikipedia.org/wiki/HSL_and_HSV
  var huePrime = hue % 360 / 60;
  var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));

  var red = 0;
  var green = 0;
  var blue = 0;

  if (huePrime >= 0 && huePrime < 1) {
    red = chroma;
    green = secondComponent;
  } else if (huePrime >= 1 && huePrime < 2) {
    red = secondComponent;
    green = chroma;
  } else if (huePrime >= 2 && huePrime < 3) {
    green = chroma;
    blue = secondComponent;
  } else if (huePrime >= 3 && huePrime < 4) {
    green = secondComponent;
    blue = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    red = secondComponent;
    blue = chroma;
  } else if (huePrime >= 5 && huePrime < 6) {
    red = chroma;
    blue = secondComponent;
  }

  var lightnessModification = lightness - chroma / 2;
  var finalRed = red + lightnessModification;
  var finalGreen = green + lightnessModification;
  var finalBlue = blue + lightnessModification;
  return convert(finalRed, finalGreen, finalBlue);
}

//      
var namedColorMap = {
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '00ffff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '0000ff',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '00ffff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'ff00ff',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '639',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32'
};

/**
 * Checks if a string is a CSS named color and returns its equivalent hex value, otherwise returns the original color.
 * @private
 */
function nameToHex(color) {
  if (typeof color !== 'string') return color;
  var normalizedColorName = color.toLowerCase();
  return namedColorMap[normalizedColorName] ? '#' + namedColorMap[normalizedColorName] : color;
}

//      
var hexRegex = /^#[a-fA-F0-9]{6}$/;
var reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
var rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
var rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/;
var hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
var hslaRegex = /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/;

/**
 * Returns an RgbColor or RgbaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a RgbColor or RgbaColor object back to a string.
 *
 * @example
 * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
 * const color1 = 'rgb(255, 0, 0)';
 * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
 * const color2 = 'hsla(210, 10%, 40%, 0.75)';
 */
function parseToRgb(color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/parseToRgb.js';
    deprecationCheck(modulePath);
  }

  if (typeof color !== 'string') {
    throw new Error('Passed an incorrect argument to a color function, please pass a string representation of a color.');
  }
  var normalizedColor = nameToHex(color);
  if (normalizedColor.match(hexRegex)) {
    return {
      red: parseInt('' + normalizedColor[1] + normalizedColor[2], 16),
      green: parseInt('' + normalizedColor[3] + normalizedColor[4], 16),
      blue: parseInt('' + normalizedColor[5] + normalizedColor[6], 16)
    };
  }
  if (normalizedColor.match(reducedHexRegex)) {
    return {
      red: parseInt('' + normalizedColor[1] + normalizedColor[1], 16),
      green: parseInt('' + normalizedColor[2] + normalizedColor[2], 16),
      blue: parseInt('' + normalizedColor[3] + normalizedColor[3], 16)
    };
  }
  var rgbMatched = rgbRegex.exec(normalizedColor);
  if (rgbMatched) {
    return {
      red: parseInt('' + rgbMatched[1], 10),
      green: parseInt('' + rgbMatched[2], 10),
      blue: parseInt('' + rgbMatched[3], 10)
    };
  }
  var rgbaMatched = rgbaRegex.exec(normalizedColor);
  if (rgbaMatched) {
    return {
      red: parseInt('' + rgbaMatched[1], 10),
      green: parseInt('' + rgbaMatched[2], 10),
      blue: parseInt('' + rgbaMatched[3], 10),
      alpha: parseFloat('' + rgbaMatched[4], 10)
    };
  }
  var hslMatched = hslRegex.exec(normalizedColor);
  if (hslMatched) {
    var hue = parseInt('' + hslMatched[1], 10);
    var saturation = parseInt('' + hslMatched[2], 10) / 100;
    var lightness = parseInt('' + hslMatched[3], 10) / 100;
    var rgbColorString = 'rgb(' + hslToRgb(hue, saturation, lightness) + ')';
    var hslRgbMatched = rgbRegex.exec(rgbColorString);
    return {
      red: parseInt('' + hslRgbMatched[1], 10),
      green: parseInt('' + hslRgbMatched[2], 10),
      blue: parseInt('' + hslRgbMatched[3], 10)
    };
  }
  var hslaMatched = hslaRegex.exec(normalizedColor);
  if (hslaMatched) {
    var _hue = parseInt('' + hslaMatched[1], 10);
    var _saturation = parseInt('' + hslaMatched[2], 10) / 100;
    var _lightness = parseInt('' + hslaMatched[3], 10) / 100;
    var _rgbColorString = 'rgb(' + hslToRgb(_hue, _saturation, _lightness) + ')';
    var _hslRgbMatched = rgbRegex.exec(_rgbColorString);
    return {
      red: parseInt('' + _hslRgbMatched[1], 10),
      green: parseInt('' + _hslRgbMatched[2], 10),
      blue: parseInt('' + _hslRgbMatched[3], 10),
      alpha: parseFloat('' + hslaMatched[4], 10)
    };
  }
  throw new Error('Could not parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.');
}

//      


function rgbToHsl(color) {
  // make sure rgb are contained in a set of [0, 255]
  var red = color.red / 255;
  var green = color.green / 255;
  var blue = color.blue / 255;

  var max = Math.max(red, green, blue);
  var min = Math.min(red, green, blue);
  var lightness = (max + min) / 2;

  if (max === min) {
    // achromatic
    if (color.alpha !== undefined) {
      return { hue: 0, saturation: 0, lightness: lightness, alpha: color.alpha };
    } else {
      return { hue: 0, saturation: 0, lightness: lightness };
    }
  }

  var hue = void 0;
  var delta = max - min;
  var saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  switch (max) {
    case red:
      hue = (green - blue) / delta + (green < blue ? 6 : 0);
      break;
    case green:
      hue = (blue - red) / delta + 2;
      break;
    default:
      // blue case
      hue = (red - green) / delta + 4;
      break;
  }

  hue *= 60;
  if (color.alpha !== undefined) {
    return { hue: hue, saturation: saturation, lightness: lightness, alpha: color.alpha };
  }
  return { hue: hue, saturation: saturation, lightness: lightness };
}

//      
/**
 * Returns an HslColor or HslaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a HslColor or HslaColor object back to a string.
 *
 * @example
 * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
 * const color1 = 'rgb(255, 0, 0)';
 * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
 * const color2 = 'hsla(210, 10%, 40%, 0.75)';
 */
function parseToHsl(color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/parseToHsl.js';
    deprecationCheck(modulePath);
  }

  // Note: At a later stage we can optimize this function as right now a hsl
  // color would be parsed converted to rgb values and converted back to hsl.
  return rgbToHsl(parseToRgb(color));
}

//      

/**
 * Reduces hex values if possible e.g. #ff8866 to #f86
 * @private
 */
var reduceHexValue = function reduceHexValue(value) {
  if (value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
    return "#" + value[1] + value[3] + value[5];
  }
  return value;
};

//      

function numberToHex(value) {
  var hex = value.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

//      
/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgb(255, 205, 100),
 *   background: rgb({ red: 255, green: 205, blue: 100 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgb(255, 205, 100)};
 *   background: ${rgb({ red: 255, green: 205, blue: 100 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffcd64";
 *   background: "#ffcd64";
 * }
 */
function rgb(value, green, blue) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/rgb.js';
    deprecationCheck(modulePath);
  }

  if (typeof value === 'number' && typeof green === 'number' && typeof blue === 'number') {
    return reduceHexValue('#' + numberToHex(value) + numberToHex(green) + numberToHex(blue));
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && green === undefined && blue === undefined) {
    return reduceHexValue('#' + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
  }

  throw new Error('Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).');
}

//      
/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgba(255, 205, 100, 0.7),
 *   background: rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 }),
 *   background: rgba(255, 205, 100, 1),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgba(255, 205, 100, 0.7)};
 *   background: ${rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 })};
 *   background: ${rgba(255, 205, 100, 1)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(255,205,100,0.7)";
 *   background: "rgba(255,205,100,0.7)";
 *   background: "#ffcd64";
 * }
 */
function rgba(value, green, blue, alpha) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/rgba.js';
    deprecationCheck(modulePath);
  }

  if (typeof value === 'number' && typeof green === 'number' && typeof blue === 'number' && typeof alpha === 'number') {
    return alpha >= 1 ? rgb(value, green, blue) : 'rgba(' + value + ',' + green + ',' + blue + ',' + alpha + ')';
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && green === undefined && blue === undefined && alpha === undefined) {
    return value.alpha >= 1 ? rgb(value.red, value.green, value.blue) : 'rgba(' + value.red + ',' + value.green + ',' + value.blue + ',' + value.alpha + ')';
  }

  throw new Error('Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).');
}

//      

function colorToHex(color) {
  return numberToHex(Math.round(color * 255));
}

function convertToHex(red, green, blue) {
  return reduceHexValue('#' + colorToHex(red) + colorToHex(green) + colorToHex(blue));
}

function hslToHex(hue, saturation, lightness) {
  return hslToRgb(hue, saturation, lightness, convertToHex);
}

//      
/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsl(359, 0.75, 0.4),
 *   background: hsl({ hue: 360, saturation: 0.75, lightness: 0.4 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsl(359, 0.75, 0.4)};
 *   background: ${hsl({ hue: 360, saturation: 0.75, lightness: 0.4 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#b3191c";
 *   background: "#b3191c";
 * }
 */
function hsl(value, saturation, lightness) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/hls.js';
    deprecationCheck(modulePath);
  }

  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number') {
    return hslToHex(value, saturation, lightness);
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && saturation === undefined && lightness === undefined) {
    return hslToHex(value.hue, value.saturation, value.lightness);
  }

  throw new Error('Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).');
}

//      
/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsla(359, 0.75, 0.4, 0.7),
 *   background: hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 }),
 *   background: hsla(359, 0.75, 0.4, 1),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsla(359, 0.75, 0.4, 0.7)};
 *   background: ${hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 })};
 *   background: ${hsla(359, 0.75, 0.4, 1)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(179,25,28,0.7)";
 *   background: "rgba(179,25,28,0.7)";
 *   background: "#b3191c";
 * }
 */
function hsla(value, saturation, lightness, alpha) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/hsla.js';
    deprecationCheck(modulePath);
  }

  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number' && typeof alpha === 'number') {
    return alpha >= 1 ? hslToHex(value, saturation, lightness) : 'rgba(' + hslToRgb(value, saturation, lightness) + ',' + alpha + ')';
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && saturation === undefined && lightness === undefined && alpha === undefined) {
    return value.alpha >= 1 ? hslToHex(value.hue, value.saturation, value.lightness) : 'rgba(' + hslToRgb(value.hue, value.saturation, value.lightness) + ',' + value.alpha + ')';
  }

  throw new Error('Passed invalid arguments to hsla, please pass multiple numbers e.g. hsl(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).');
}

//      
var isRgb = function isRgb(color) {
  return (typeof color === 'undefined' ? 'undefined' : _typeof(color)) === 'object' && typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' &&
  // $FlowIgnoreNextLine not sure why this complains
  typeof color.alpha !== 'number';
};

var isRgba = function isRgba(color) {
  return (typeof color === 'undefined' ? 'undefined' : _typeof(color)) === 'object' && typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' &&
  // $FlowIgnoreNextLine not sure why this complains
  typeof color.alpha === 'number';
};

var isHsl = function isHsl(color) {
  return (typeof color === 'undefined' ? 'undefined' : _typeof(color)) === 'object' && typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' &&
  // $FlowIgnoreNextLine not sure why this complains
  typeof color.alpha !== 'number';
};

var isHsla = function isHsla(color) {
  return (typeof color === 'undefined' ? 'undefined' : _typeof(color)) === 'object' && typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' &&
  // $FlowIgnoreNextLine not sure why this complains
  typeof color.alpha === 'number';
};

/**
 * Converts a RgbColor, RgbaColor, HslColor or HslaColor object to a color string.
 * This util is useful in case you only know on runtime which color object is
 * used. Otherwise we recommend to rely on `rgb`, `rgba`, `hsl` or `hsla`.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: toColorString({ red: 255, green: 205, blue: 100 }),
 *   background: toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 }),
 *   background: toColorString({ hue: 240, saturation: 1, lightness: 0.5 }),
 *   background: toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${toColorString({ red: 255, green: 205, blue: 100 })};
 *   background: ${toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 })};
 *   background: ${toColorString({ hue: 240, saturation: 1, lightness: 0.5 })};
 *   background: ${toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 })};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#ffcd64";
 *   background: "rgba(255,205,100,0.72)";
 *   background: "#00f";
 *   background: "rgba(179,25,25,0.72)";
 * }
 */
function toColorString(color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/toColorString.js';
    deprecationCheck(modulePath);
  }

  if (isRgba(color)) {
    // $FlowIgnoreNextLine not sure why this complains
    return rgba(color);
  } else if (isRgb(color)) {
    // $FlowIgnoreNextLine not sure why this complains
    return rgb(color);
  } else if (isHsla(color)) {
    // $FlowIgnoreNextLine not sure why this complains
    return hsla(color);
  } else if (isHsl(color)) {
    // $FlowIgnoreNextLine not sure why this complains
    return hsl(color);
  }
  throw new Error('Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.');
}

//      

// Type definitions taken from https://github.com/gcanti/flow-static-land/blob/master/src/Fun.js


// eslint-disable-next-line no-unused-vars


// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-redeclare


function curried(f, length, acc) {
  return function fn() {
    // eslint-disable-next-line prefer-rest-params
    var combined = acc.concat(Array.prototype.slice.call(arguments));
    return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
  };
}
// eslint-disable-next-line no-redeclare
function curry(f) {
  return curried(f, f.length, []);
}

//      
/**
 * Changes the hue of the color. Hue is a number between 0 to 360. The first
 * argument for adjustHue is the amount of degrees the color is rotated along
 * the color wheel.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: adjustHue(180, '#448'),
 *   background: adjustHue(180, 'rgba(101,100,205,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${adjustHue(180, '#448')};
 *   background: ${adjustHue(180, 'rgba(101,100,205,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#888844";
 *   background: "rgba(136,136,68,0.7)";
 * }
 */
function adjustHue(degree, color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/adjustHue.js';
    deprecationCheck(modulePath);
  }

  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    hue: (hslColor.hue + degree) % 360
  }));
}

var adjustHue$1 = curry(adjustHue);

//      
/**
 * Returns the complement of the provided color. This is identical to adjustHue(180, <color>).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: complement('#448'),
 *   background: complement('rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${complement('#448')};
 *   background: ${complement('rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#884";
 *   background: "rgba(153,153,153,0.7)";
 * }
 */
function complement(color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/complement.js';
    deprecationCheck(modulePath);
  }

  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    hue: (hslColor.hue + 180) % 360
  }));
}

//      

function guard(lowerBoundary, upperBoundary, value) {
  return Math.max(lowerBoundary, Math.min(upperBoundary, value));
}

//      
/**
 * Returns a string value for the darkened color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: darken(0.2, '#FFCD64'),
 *   background: darken(0.2, 'rgba(255,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${darken(0.2, '#FFCD64')};
 *   background: ${darken(0.2, 'rgba(255,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffbd31";
 *   background: "rgba(255,189,49,0.7)";
 * }
 */
function darken(amount, color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/darken.js';
    deprecationCheck(modulePath);
  }

  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness - amount)
  }));
}

var darken$1 = curry(darken);

//      
/**
 * Decreases the intensity of a color. Its range is between 0 to 1. The first
 * argument of the desaturate function is the amount by how much the color
 * intensity should be decreased.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: desaturate(0.2, '#CCCD64'),
 *   background: desaturate(0.2, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${desaturate(0.2, '#CCCD64')};
 *   background: ${desaturate(0.2, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#b8b979";
 *   background: "rgba(184,185,121,0.7)";
 * }
 */
function desaturate(amount, color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/desaturate.js';
    deprecationCheck(modulePath);
  }

  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    saturation: guard(0, 1, hslColor.saturation - amount)
  }));
}

var desaturate$1 = curry(desaturate);

//      
/**
 * Converts the color to a grayscale, by reducing its saturation to 0.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: grayscale('#CCCD64'),
 *   background: grayscale('rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${grayscale('#CCCD64')};
 *   background: ${grayscale('rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#999";
 *   background: "rgba(153,153,153,0.7)";
 * }
 */
function grayscale(color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/grayscale.js';
    deprecationCheck(modulePath);
  }

  return toColorString(_extends({}, parseToHsl(color), {
    saturation: 0
  }));
}

//      
/**
 * Inverts the red, green and blue values of a color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: invert('#CCCD64'),
 *   background: invert('rgba(101,100,205,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${invert('#CCCD64')};
 *   background: ${invert('rgba(101,100,205,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#33329b";
 *   background: "rgba(154,155,50,0.7)";
 * }
 */
function invert(color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/invert.js';
    deprecationCheck(modulePath);
  }

  // parse color string to rgb
  var value = parseToRgb(color);
  return toColorString(_extends({}, value, {
    red: 255 - value.red,
    green: 255 - value.green,
    blue: 255 - value.blue
  }));
}

//      
/**
 * Returns a string value for the lightened color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: lighten(0.2, '#CCCD64'),
 *   background: lighten(0.2, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${lighten(0.2, '#FFCD64')};
 *   background: ${lighten(0.2, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#e5e6b1";
 *   background: "rgba(229,230,177,0.7)";
 * }
 */
function lighten(amount, color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/lighten.js';
    deprecationCheck(modulePath);
  }

  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness + amount)
  }));
}

var lighten$1 = curry(lighten);

//      
/**
 * Mixes two colors together by calculating the average of each of the RGB components.
 *
 * By default the weight is 0.5 meaning that half of the first color and half the second
 * color should be used. Optionally the weight can be modified by providing a number
 * as the first argument. 0.25 means that a quarter of the first color and three quarters
 * of the second color should be used.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: mix(0.5, '#f00', '#00f')
 *   background: mix(0.25, '#f00', '#00f')
 *   background: mix(0.5, 'rgba(255, 0, 0, 0.5)', '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${mix(0.5, '#f00', '#00f')};
 *   background: ${mix(0.25, '#f00', '#00f')};
 *   background: ${mix(0.5, 'rgba(255, 0, 0, 0.5)', '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#7f007f";
 *   background: "#3f00bf";
 *   background: "rgba(63, 0, 191, 0.75)";
 * }
 */
function mix() {
  var weight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5;
  var color = arguments[1];
  var otherColor = arguments[2];

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/mix.js';
    deprecationCheck(modulePath);
  }

  var parsedColor1 = parseToRgb(color);
  var color1 = _extends({}, parsedColor1, {
    alpha: typeof parsedColor1.alpha === 'number' ? parsedColor1.alpha : 1
  });

  var parsedColor2 = parseToRgb(otherColor);
  var color2 = _extends({}, parsedColor2, {
    alpha: typeof parsedColor2.alpha === 'number' ? parsedColor2.alpha : 1
  });

  // The formular is copied from the original Sass implementation:
  // http://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method
  var alphaDelta = color1.alpha - color2.alpha;
  var x = weight * 2 - 1;
  var y = x * alphaDelta === -1 ? x : x + alphaDelta;
  var z = 1 + x * alphaDelta;
  var weight1 = (y / z + 1) / 2.0;
  var weight2 = 1 - weight1;

  var mixedColor = {
    red: Math.floor(color1.red * weight1 + color2.red * weight2),
    green: Math.floor(color1.green * weight1 + color2.green * weight2),
    blue: Math.floor(color1.blue * weight1 + color2.blue * weight2),
    alpha: color1.alpha + (color2.alpha - color1.alpha) * (weight / 1.0)
  };

  return rgba(mixedColor);
}

var mix$1 = curry(mix);

//      
/**
 * Increases the opacity of a color. Its range for the amount is between 0 to 1.
 *
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: opacify(0.1, 'rgba(255, 255, 255, 0.9)');
 *   background: opacify(0.2, 'hsla(0, 0%, 100%, 0.5)'),
 *   background: opacify(0.5, 'rgba(255, 0, 0, 0.2)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${opacify(0.1, 'rgba(255, 255, 255, 0.9)')};
 *   background: ${opacify(0.2, 'hsla(0, 0%, 100%, 0.5)')},
 *   background: ${opacify(0.5, 'rgba(255, 0, 0, 0.2)')},
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#fff";
 *   background: "rgba(255,255,255,0.7)";
 *   background: "rgba(255,0,0,0.7)";
 * }
 */
function opacify(amount, color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/opacify.js';
    deprecationCheck(modulePath);
  }

  var parsedColor = parseToRgb(color);
  var alpha = typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;
  var colorWithAlpha = _extends({}, parsedColor, {
    alpha: guard(0, 1, alpha + amount)
  });
  return rgba(colorWithAlpha);
}

var opacify$1 = curry(opacify);

//      
/**
 * Increases the intensity of a color. Its range is between 0 to 1. The first
 * argument of the saturate function is the amount by how much the color
 * intensity should be increased.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: saturate(0.2, '#CCCD64'),
 *   background: saturate(0.2, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${saturate(0.2, '#FFCD64')};
 *   background: ${saturate(0.2, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#e0e250";
 *   background: "rgba(224,226,80,0.7)";
 * }
 */
function saturate(amount, color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/saturate.js';
    deprecationCheck(modulePath);
  }

  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    saturation: guard(0, 1, hslColor.saturation + amount)
  }));
}

var saturate$1 = curry(saturate);

//      
/**
 * Sets the hue of a color to the provided value. The hue range can be
 * from 0 and 359.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setHue(42, '#CCCD64'),
 *   background: setHue(244, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setHue(42, '#CCCD64')};
 *   background: ${setHue(244, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#cdae64";
 *   background: "rgba(107,100,205,0.7)";
 * }
 */
function setHue(hue, color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/setHue.js';
    deprecationCheck(modulePath);
  }

  return toColorString(_extends({}, parseToHsl(color), {
    hue: hue
  }));
}

var setHue$1 = curry(setHue);

//      
/**
 * Sets the lightness of a color to the provided value. The lightness range can be
 * from 0 and 1.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setLightness(0.2, '#CCCD64'),
 *   background: setLightness(0.75, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setLightness(0.2, '#CCCD64')};
 *   background: ${setLightness(0.75, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#4d4d19";
 *   background: "rgba(223,224,159,0.7)";
 * }
 */
function setLightness(lightness, color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/setLightness.js';
    deprecationCheck(modulePath);
  }

  return toColorString(_extends({}, parseToHsl(color), {
    lightness: lightness
  }));
}

var setLightness$1 = curry(setLightness);

//      
/**
 * Sets the saturation of a color to the provided value. The lightness range can be
 * from 0 and 1.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: setSaturation(0.2, '#CCCD64'),
 *   background: setSaturation(0.75, 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${setSaturation(0.2, '#CCCD64')};
 *   background: ${setSaturation(0.75, 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#adad84";
 *   background: "rgba(228,229,76,0.7)";
 * }
 */
function setSaturation(saturation, color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/setSaturation.js';
    deprecationCheck(modulePath);
  }

  return toColorString(_extends({}, parseToHsl(color), {
    saturation: saturation
  }));
}

var setSaturation$1 = curry(setSaturation);

//      
/**
 * Shades a color by mixing it with black. `shade` can produce
 * hue shifts, where as `darken` manipulates the luminance channel and therefore
 * doesn't produce hue shifts.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: shade(0.25, '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${shade(0.25, '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#00003f";
 * }
 */

function shade(percentage, color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/shade.js';
    deprecationCheck(modulePath);
  }

  if (typeof percentage !== 'number' || percentage > 1 || percentage < -1) {
    throw new Error('Passed an incorrect argument to shade, please pass a percentage less than or equal to 1 and larger than or equal to -1.');
  }
  if (typeof color !== 'string') {
    throw new Error('Passed an incorrect argument to a color function, please pass a string representation of a color.');
  }
  return mix$1(percentage, color, 'rgb(0, 0, 0)');
}

var shade$1 = curry(shade);

//      
/**
 * Tints a color by mixing it with white. `tint` can produce
 * hue shifts, where as `lighten` manipulates the luminance channel and therefore
 * doesn't produce hue shifts.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: tint(0.25, '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${tint(0.25, '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#bfbfff";
 * }
 */

function tint(percentage, color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/tint.js';
    deprecationCheck(modulePath);
  }

  if (typeof percentage !== 'number' || percentage > 1 || percentage < -1) {
    throw new Error('Passed an incorrect argument to tint, please pass a percentage less than or equal to 1 and larger than or equal to -1.');
  }
  if (typeof color !== 'string') {
    throw new Error('Passed an incorrect argument to a color function, please pass a string representation of a color.');
  }
  return mix$1(percentage, color, 'rgb(255, 255, 255)');
}

var tint$1 = curry(tint);

//      
/**
 * Decreases the opacity of a color. Its range for the amount is between 0 to 1.
 *
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: transparentize(0.1, '#fff');
 *   background: transparentize(0.2, 'hsl(0, 0%, 100%)'),
 *   background: transparentize(0.5, 'rgba(255, 0, 0, 0.8)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${transparentize(0.1, '#fff')};
 *   background: ${transparentize(0.2, 'hsl(0, 0%, 100%)')},
 *   background: ${transparentize(0.5, 'rgba(255, 0, 0, 0.8)')},
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(255,255,255,0.9)";
 *   background: "rgba(255,255,255,0.8)";
 *   background: "rgba(255,0,0,0.3)";
 * }
 */
function transparentize(amount, color) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'color/transparentize.js';
    deprecationCheck(modulePath);
  }

  var parsedColor = parseToRgb(color);
  var alpha = typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;
  var colorWithAlpha = _extends({}, parsedColor, {
    alpha: guard(0, 1, alpha - amount)
  });
  return rgba(colorWithAlpha);
}

var transparentize$1 = curry(transparentize);

//      
/** */

/**
 * Shorthand for easily setting the animation property. Allows either multiple arrays with animations
 * or a single animation spread over the arguments.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...animation(['rotate', '1s', 'ease-in-out'], ['colorchange', '2s'])
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${animation(['rotate', '1s', 'ease-in-out'], ['colorchange', '2s'])}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'animation': 'rotate 1s ease-in-out, colorchange 2s'
 * }
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...animation('rotate', '1s', 'ease-in-out')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${animation('rotate', '1s', 'ease-in-out')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'animation': 'rotate 1s ease-in-out'
 * }
 */
function animation() {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'shorthands/animation.js';
    deprecationCheck(modulePath);
  }

  // Allow single or multiple animations passed

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var multiMode = Array.isArray(args[0]);
  if (!multiMode && args.length > 8) {
    throw new Error('The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation');
  }
  var code = args.map(function (arg) {
    if (multiMode && !Array.isArray(arg) || !multiMode && Array.isArray(arg)) {
      throw new Error("To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')");
    }
    if (Array.isArray(arg) && arg.length > 8) {
      throw new Error('The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation');
    }

    return Array.isArray(arg) ? arg.join(' ') : arg;
  }).join(', ');

  return {
    animation: code
  };
}

//      
/**
 * Shorthand that accepts any number of backgroundImage values as parameters for creating a single background statement.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...backgroundImages('url("/image/background.jpg")', 'linear-gradient(red, green)')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${...backgroundImages('url("/image/background.jpg")', 'linear-gradient(red, green)')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'backgroundImage': 'url("/image/background.jpg"), linear-gradient(red, green)'
 * }
 */

function backgroundImages() {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'shorthands/backgroundImages.js';
    deprecationCheck(modulePath);
  }

  for (var _len = arguments.length, properties = Array(_len), _key = 0; _key < _len; _key++) {
    properties[_key] = arguments[_key];
  }

  return {
    backgroundImage: properties.join(', ')
  };
}

//      
/**
 * Thorthand that accepts any number of background values as parameters for creating a single background statement.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...backgrounds('url("/image/background.jpg")', 'linear-gradient(red, green)', 'center no-repeat')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${...backgrounds('url("/image/background.jpg")', 'linear-gradient(red, green)', 'center no-repeat')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'background': 'url("/image/background.jpg"), linear-gradient(red, green), center no-repeat'
 * }
 */
function backgrounds() {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'shorthands/backgrounds.js';
    deprecationCheck(modulePath);
  }

  for (var _len = arguments.length, properties = Array(_len), _key = 0; _key < _len; _key++) {
    properties[_key] = arguments[_key];
  }

  return {
    background: properties.join(', ')
  };
}

//      
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderColor('red', 'green', 'blue', 'yellow')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderColor('red', 'green', 'blue', 'yellow')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopColor': 'red',
 *   'borderRightColor': 'green',
 *   'borderBottomColor': 'blue',
 *   'borderLeftColor': 'yellow'
 * }
 */

function borderColor() {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'shorthands/borderColor.js';
    deprecationCheck(modulePath);
  }

  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty$1.apply(undefined, ['borderColor'].concat(values));
}

//      
/**
 * A shorthand that accepts a value for side and a value for radius and applies the radius value to both corners of the side.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderRadius('top', '5px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderRadius('top', '5px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopRightRadius': '5px',
 *   'borderTopLeftRadius': '5px',
 * }
 */

function borderRadius(side, radius) {
  var uppercaseSide = capitalizeString(side);
  if (uppercaseSide === 'Top' || uppercaseSide === 'Bottom') {
    var _ref;

    return _ref = {}, defineProperty(_ref, 'border' + uppercaseSide + 'RightRadius', radius), defineProperty(_ref, 'border' + uppercaseSide + 'LeftRadius', radius), _ref;
  }

  if (uppercaseSide === 'Left' || uppercaseSide === 'Right') {
    var _ref2;

    return _ref2 = {}, defineProperty(_ref2, 'borderTop' + uppercaseSide + 'Radius', radius), defineProperty(_ref2, 'borderBottom' + uppercaseSide + 'Radius', radius), _ref2;
  }
}

var borderRadius$1 = polish({
  modulePath: 'shorthands/borderRadius',
  types: [{ key: 'side', type: 'cssDirection', required: true }, { key: 'radius', type: 'cssMeasure', required: true }]
})(borderRadius);

//      
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderStyle('solid', 'dashed', 'dotted', 'double')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderStyle('solid', 'dashed', 'dotted', 'double')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopStyle': 'solid',
 *   'borderRightStyle': 'dashed',
 *   'borderBottomStyle': 'dotted',
 *   'borderLeftStyle': 'double'
 * }
 */

function borderStyle() {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'shorthands/borderStyle.js';
    deprecationCheck(modulePath);
  }

  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty$1.apply(undefined, ['borderStyle'].concat(values));
}

//      
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderWidth('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderWidth('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'borderTopWidth': '12px',
 *   'borderRightWidth': '24px',
 *   'borderBottomWidth': '36px',
 *   'borderLeftWidth': '48px'
 * }
 */

function borderWidth() {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'shorthands/borderWidth.js';
    deprecationCheck(modulePath);
  }

  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty$1.apply(undefined, ['borderWidth'].concat(values));
}

//      
function generateSelectors(template, state) {
  var stateSuffix = state ? ':' + state : '';
  return template(stateSuffix);
}

/**
 * Function helper that adds an array of states to a template of selectors. Used in textInputs and buttons.
 * @private
 */
function statefulSelectors(states, template, stateMap) {
  if (!template) throw new Error('You must provide a template to this method.');
  if (states.length === 0) return generateSelectors(template, null);
  var selectors = [];
  for (var i = 0; i < states.length; i += 1) {
    if (stateMap && stateMap.indexOf(states[i]) < 0) {
      throw new Error('You passed an unsupported selector state to this method.');
    }
    selectors.push(generateSelectors(template, states[i]));
  }
  selectors = selectors.join(',');
  return selectors;
}

//      
var stateMap = [undefined, null, 'active', 'focus', 'hover'];

function template(state) {
  return 'button' + state + ',\n  input[type="button"]' + state + ',\n  input[type="reset"]' + state + ',\n  input[type="submit"]' + state;
}

/** */

/**
 * Populates selectors that target all buttons. You can pass optional states to append to the selectors.
 * @example
 * // Styles as object usage
 * const styles = {
 *   [buttons('active')]: {
 *     'border': 'none'
 *   }
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   > ${buttons('active')} {
 *     border: none;
 *   }
 * `
 *
 * // CSS in JS Output
 *
 *  'button:active,
 *  'input[type="button"]:active,
 *  'input[type=\"reset\"]:active,
 *  'input[type=\"submit\"]:active: {
 *   'border': 'none'
 * }
 */

function buttons() {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'shorthands/buttons.js';
    deprecationCheck(modulePath);
  }

  for (var _len = arguments.length, states = Array(_len), _key = 0; _key < _len; _key++) {
    states[_key] = arguments[_key];
  }

  return statefulSelectors(states, template, stateMap);
}

//      
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...margin('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${margin('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'marginTop': '12px',
 *   'marginRight': '24px',
 *   'marginBottom': '36px',
 *   'marginLeft': '48px'
 * }
 */

function margin() {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'shorthands/margin.js';
    deprecationCheck(modulePath);
  }

  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty$1.apply(undefined, ['margin'].concat(values));
}

//      
/**
 * Shorthand that accepts up to four values, including null to skip a value, and maps them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...padding('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${padding('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'paddingTop': '12px',
 *   'paddingRight': '24px',
 *   'paddingBottom': '36px',
 *   'paddingLeft': '48px'
 * }
 */

function padding() {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'shorthands/padding.js';
    deprecationCheck(modulePath);
  }

  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return directionalProperty$1.apply(undefined, ['padding'].concat(values));
}

//      
var positionMap$1 = ['absolute', 'fixed', 'relative', 'static', 'sticky'];

/**
 * Shorthand accepts up to five values, including null to skip a value, and maps them to their respective directions. The first value can optionally be a position keyword.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...position('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${position('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'top': '12px',
 *   'right': '24px',
 *   'bottom': '36px',
 *   'left': '48px'
 * }
 *
 * // Styles as object usage
 * const styles = {
 *   ...position('absolute', '12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${position('absolute', '12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'position': 'absolute',
 *   'top': '12px',
 *   'right': '24px',
 *   'bottom': '36px',
 *   'left': '48px'
 * }
 */

function position(positionKeyword) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'shorthands/position.js';
    deprecationCheck(modulePath);
  }

  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  if (positionMap$1.indexOf(positionKeyword) >= 0) {
    return _extends({
      position: positionKeyword
    }, directionalProperty$1.apply(undefined, [''].concat(values)));
  } else {
    var firstValue = positionKeyword; // in this case position is actually the first value
    return directionalProperty$1.apply(undefined, ['', firstValue].concat(values));
  }
}

//      
/**
 * Shorthand to set the height and width properties in a single statement.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...size('300px', '250px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${size('300px', '250px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'height': '300px',
 *   'width': '250px',
 * }
 */

function size(height) {
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : height;

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'shorthands/size.js';
    deprecationCheck(modulePath);
  }

  return {
    height: height,
    width: width
  };
}

//      
var stateMap$1 = [undefined, null, 'active', 'focus', 'hover'];

function template$1(state) {
  return 'input[type="color"]' + state + ',\n    input[type="date"]' + state + ',\n    input[type="datetime"]' + state + ',\n    input[type="datetime-local"]' + state + ',\n    input[type="email"]' + state + ',\n    input[type="month"]' + state + ',\n    input[type="number"]' + state + ',\n    input[type="password"]' + state + ',\n    input[type="search"]' + state + ',\n    input[type="tel"]' + state + ',\n    input[type="text"]' + state + ',\n    input[type="time"]' + state + ',\n    input[type="url"]' + state + ',\n    input[type="week"]' + state + ',\n    input:not([type])' + state + ',\n    textarea' + state;
}

/** */

/**
 * Populates selectors that target all text inputs. You can pass optional states to append to the selectors.
 * @example
 * // Styles as object usage
 * const styles = {
 *   [textInputs('active')]: {
 *     'border': 'none'
 *   }
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   > ${textInputs('active')} {
 *     border: none;
 *   }
 * `
 *
 * // CSS in JS Output
 *
 *  'input[type="color"]:active,
 *  input[type="date"]:active,
 *  input[type="datetime"]:active,
 *  input[type="datetime-local"]:active,
 *  input[type="email"]:active,
 *  input[type="month"]:active,
 *  input[type="number"]:active,
 *  input[type="password"]:active,
 *  input[type="search"]:active,
 *  input[type="tel"]:active,
 *  input[type="text"]:active,
 *  input[type="time"]:active,
 *  input[type="url"]:active,
 *  input[type="week"]:active,
 *  input:not([type]):active,
 *  textarea:active': {
 *   'border': 'none'
 * }
 */

function textInputs() {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'shorthands/textInputs.js';
    deprecationCheck(modulePath);
  }

  for (var _len = arguments.length, states = Array(_len), _key = 0; _key < _len; _key++) {
    states[_key] = arguments[_key];
  }

  return statefulSelectors(states, template$1, stateMap$1);
}

//      
/**
 * Shorthand that accepts any number of transition values as parameters for creating a single transition statement.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...transitions('opacity 1.0s ease-in 0s', 'width 2.0s ease-in 2s')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${transitions('opacity 1.0s ease-in 0s', 'width 2.0s ease-in 2s')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'transition': 'opacity 1.0s ease-in 0s, width 2.0s ease-in 2s'
 * }
 */

function transitions() {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    var modulePath = 'shorthands/transitions.js';
    deprecationCheck(modulePath);
  }

  for (var _len = arguments.length, properties = Array(_len), _key = 0; _key < _len; _key++) {
    properties[_key] = arguments[_key];
  }

  return {
    transition: properties.join(', ')
  };
}

//      
// Helpers
// Mixins
// Color
// Shorthands

exports.adjustHue = adjustHue$1;
exports.animation = animation;
exports.backgroundImages = backgroundImages;
exports.backgrounds = backgrounds;
exports.borderColor = borderColor;
exports.borderRadius = borderRadius$1;
exports.borderStyle = borderStyle;
exports.borderWidth = borderWidth;
exports.buttons = buttons;
exports.clearFix = clearFix$1;
exports.complement = complement;
exports.darken = darken$1;
exports.desaturate = desaturate$1;
exports.directionalProperty = directionalProperty$1;
exports.ellipsis = ellipsis$1;
exports.em = em;
exports.fontFace = fontFace$1;
exports.grayscale = grayscale;
exports.invert = invert;
exports.hideText = hideText$1;
exports.hiDPI = hiDPI$1;
exports.hsl = hsl;
exports.hsla = hsla;
exports.lighten = lighten$1;
exports.margin = margin;
exports.mix = mix$1;
exports.modularScale = modularScale$1;
exports.normalize = normalize$1;
exports.opacify = opacify$1;
exports.padding = padding;
exports.parseToHsl = parseToHsl;
exports.parseToRgb = parseToRgb;
exports.placeholder = placeholder$1;
exports.position = position;
exports.radialGradient = radialGradient$1;
exports.rem = rem;
exports.retinaImage = retinaImage$1;
exports.rgb = rgb;
exports.rgba = rgba;
exports.saturate = saturate$1;
exports.selection = selection$1;
exports.setHue = setHue$1;
exports.setLightness = setLightness$1;
exports.setSaturation = setSaturation$1;
exports.shade = shade$1;
exports.size = size;
exports.stripUnit = stripUnit$1;
exports.textInputs = textInputs;
exports.timingFunctions = timingFunctions$1;
exports.tint = tint$1;
exports.toColorString = toColorString;
exports.transitions = transitions;
exports.transparentize = transparentize$1;
exports.triangle = triangle$1;
exports.wordWrap = wordWrap$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
