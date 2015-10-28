/*
 *  Babel plugin to remove unwanted `import` declarations when building
 *  packages with babel transforms.
 *
 *  PLEASE USE WITH COUTION and check your RegExp expressions carefully.
 */

module.exports = function (regex) {
    return function(babel) {
        return new babel.Transformer('babel-plugin-remove-imports', {
            ImportDeclaration: function (node, parent) {

                //node.source.value contains the import declaration
                var text = node.source.value;

                //convert regex to Array of regexp if we have a single item
                if(!(regex instanceof Array)) {
                    regex = [regex];
                }

                //iterate over all regexps to find a truthy one,
                //when found, remove the `import` node from the code
                for(var i = 0, len = regex.length; i < len; i++) {
                    if(isRegexExpressionTruthy(text, regex[i])) {
                        this.dangerouslyRemove();
                        break;
                    }
                }
            }
        });
    }
};

//check whether the text (import declaration) is matches the given regex
function isRegexExpressionTruthy(text, regex) {
    return (regex instanceof RegExp) ? !!text.match(regex) : false;
}
