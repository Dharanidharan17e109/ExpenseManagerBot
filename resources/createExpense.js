const { CardFactory } = require("botbuilder");

async function createExpense(context){
    var expenseCard={
        "type": "AdaptiveCard",
        "body": [
            {
                "type": "TextBlock",
                "size": "Large",
                "weight": "Bolder",
                "text": "Create Expense",
                "separator": true,
                "horizontalAlignment": "Center",
                "style": "heading",
                "fontType": "Default",
                "color": "Accent"
            },
            {
                "type": "Input.Text",
                "id": "ExpName",
                "label": "Expense Name",
                "spacing":"padding"
              },
              {
                "type": "Input.Text",
                "id": "Expdesc",
                "label": "Expense Description",
                "style": "password"
              },
              {
                "type": "Input.Number",
                "id": "Expprice",
                "label": "Expense Price",
                "style": "password"
              }
        ],
        "actions": [
            {
              "type": "Action.Submit",
              "title": "Create Expense",
              "spacing":"large"

            }
          ],
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.0",
        "fallbackText": "This card requires Adaptive Cards v1.2 support to be rendered properly."
    };

    var replyMsg=CardFactory.adaptiveCard(expenseCard);

    await context.sendActivity({attachments:[replyMsg]});
}

module.exports.createExpense=createExpense;