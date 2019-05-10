/**
 * [realMusicSymbol]
 *
 * modifie les noms des notes ou des accords pour y faire apparaitre les vrais symboles ♭ et ♯
 * et place si nécessaire une partie du nom en exposant
 *
 * @param  {objet}  pString chaine a modifier
 */

 //!\ A MODIFIER POUR QU'ELLE PUISSE FONCTIONNER SUR LES NOTATIONS AUTRES QUE ANGLAISES

export function realMusicSymbol(pString) {

    var result = ''

    if (pString != undefined) {

        var exp = ''
        var root = ''
        var rootExp = ''
        var rs = 0

        if( pString[1] == '#' || pString[1] == 'b'){
            root = pString[0] + pString[1]
            rs=2;
        }
        else{
            root = pString[0]
            rs=1;
        }

        for (rs; rs < pString.length; rs++) {
            exp += pString[rs]
        }

        switch (exp) {
            case 'b5':
                exp = '<SUP>(b5)</SUP>'
                break
            case 'm(#5)':
                exp = 'm<SUP>(#5)</SUP>'
                break
            case '5':
                exp = '<SUP>5</SUP>'
                break
            case 'sus4':
                exp = 'sus<SUP>4</SUP>'
                break
            case 'sus2':
                exp = 'sus<SUP>2</SUP>'
                break
            case 'sus2sus4':
                exp = 'sus<SUP>2</SUP>sus<SUP>4</SUP>'
                break
            case "7":
                exp = "<SUP>7</SUP>"
                break
            case 'maj7':
                exp = 'maj<SUP>7</SUP>'
                break
            case 'm7':
                exp = 'm<SUP>7</SUP>'
                break
            case 'mmaj7':
                exp = 'm<SUP>maj7</SUP>'
                break
            case '7sus4':
                exp = '<SUP>7</SUP>sus<SUP>4</SUP>'
                break
            case '7#9':
                exp = '<SUP>7#9</SUP>'
                break
            case 'm7(b5)':
                exp = 'm<SUP>7(b5)</SUP>'
                break
            case 'aug7':
                exp = '<SUP>aug7</SUP>'
                break
            case '6':
                exp = '<SUP>6</SUP>'
                break
            case 'm6':
                exp = 'm<SUP>6</SUP>'
                break
            case '6/9':
                exp = '<SUP>6/9</SUP>'
                break
            case 'm6/9':
                exp = 'm<SUP>6/9</SUP>'
                break
            case 'maj7(b5)':
                exp = '<SUP>maj7(b5)</SUP>'
                break
            default:
                break
        }

        rootExp = root + exp

        // on remplace les bémoles et les dièses par les bons symboles
        for (let i = 0; i < rootExp.length; i++) {
            switch (rootExp[i]) {
                case 'b':
                    if (i != 0) {
                        if (rootExp[i - 1] != " ") {
                            result += '♭'
                            break
                        }
                    }
                    result += 'b'
                    break
                case '#':
                    result += '♯'
                    break
                default:
                    result += rootExp[i]
                    break
            }
        }
        return result
    }
    return undefined
}

/**
 * Retourne TRUE si le premier tableau contient tous les éléments du second
 * ou retourne FALSE sinon.
 *
 * @param {array} superset
 * @param {array} subset
 *
 * @returns {boolean}
 */
export function arrayContainsArray(superset, subset) {

    if (0 === subset.length) {
        return false
    }
    return subset.every(function (value) {
        return (superset.indexOf(value) >= 0)
    });
}

