const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;


router.get('/',( req, res ) => {
    const numberOfCards = cards.length;
    const flashCardId = Math.floor(Math.random() * numberOfCards);
    res.redirect( `/cards/${flashCardId}`);
});

router.get('/:id',(req, res) => {
    const { side } = req.query;
    const { id } = req.params;

    if (!side) {
         return res.redirect(`/cards/${id}?side=question`);
    }

    const name = req.cookies.username;
    const text = cards[id][side];
    const { hint } = cards[id]
    
    const templateData = { text, id, name, side };
    
    // if question is show, shown hint, if anwser is show do not show hint
   if ( side === 'question') { 
       templateData.hint = hint;
       templateData.sideToShow = 'answer';
       templateData.sideToDisplay = 'Answer';
    } else if ( side === 'answer') {
       templateData.sideToShow = 'question';
       templateData.sideToDisplay = 'Question'; 
    }   else if ( side === 'hint') {
        res.redirect(`/cards/${id}?side=question`);
    } 

    res.render('card', templateData);
    

});

module.exports = router;