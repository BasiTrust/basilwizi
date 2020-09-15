exports.com_page = [
  (req, res, next) => {
    res.render('extensions/community');
  }
];

exports.ab_t =[
  (req, res, next)=> {
    res.render('extensions/about');
  }
];

exports.mana_ge =[
  (req, res, next) => {
    res.render('extensions/management');
  }
];

exports.rep_orts =[
  (req, res, next) => {
    res.render('extensions/reports');
  }
];

exports.bir_d = [
  (req, res) => {
    res.render('play/flappy-bird', {title: 'Basilwizi- people of the great river'});
  }
];