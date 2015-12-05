
var getListItem = function(label, property, type) {
    if (!property || property === 'null') return '';

    var dd = property;

    if (type === 'email') {
      dd = (<a href={'mailto:'+dd}>{dd}</a>);
    } else if (type === 'link') {
      dd = (<a href={dd}>{dd}</a>);
    }

    return (<div><dt>{label}</dt><dd>{dd}</dd></div>);
};


module.exports = {
    getListItem: getListItem
}

