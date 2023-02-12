/* Convert string to title case */
export function titleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
}

// Calculate aspect ratio base on width and height
export function reduce(number,denomin){
    var gcd = function gcd(a,b){
        return b ? gcd(b, a%b) : a;
    };
    gcd = gcd(number,denomin);
    return `${number/gcd}/${denomin/gcd}`;
}