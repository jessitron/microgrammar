
/**
 * Config properties. Mix these into Concats or make other matchers
 * implement the relevant interfaces.
 */

/**
 * Implemented by matchers with configurable whitespace handling.
 */
export interface WhiteSpaceHandler {

    $consumeWhiteSpaceBetweenTokens: boolean;

}

/**
 * Object literals that provide concats can bring this in
 * via a spread to get white space sensitivity
 * @type {{consumeWhiteSpaceBetweenTokens: boolean}}
 */
export const WhiteSpaceSensitive: WhiteSpaceHandler = {

    $consumeWhiteSpaceBetweenTokens: false,
};
