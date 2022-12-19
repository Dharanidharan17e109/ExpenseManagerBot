const { CardFactory, ActionTypes, MessageFactory } = require('botbuilder-core');

async function sendSuggestActionCard(context){
    const welcomeSuggestedActions=[
        {
            type:ActionTypes.PostBack,
            title:"List my expenses📃",
            value:"ListExpense"
        },
        {
            type:ActionTypes.PostBack,
            title:"Add new expense➕",
            value:"CreateExpense"
        }
    ];
    var suggestedMsg=MessageFactory.suggestedActions(welcomeSuggestedActions,"Please select any options below:");
    await context.sendActivity(suggestedMsg);
}

module.exports.sendSuggestActionCard=sendSuggestActionCard;