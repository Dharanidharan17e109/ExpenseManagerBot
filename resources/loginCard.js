const { CardFactory } = require("botbuilder");

async function loginCard(context){
    var loginCard={
        "type": "AdaptiveCard",
        "body": [
            {
                "type": "TextBlock",
                "size": "Large",
                "weight": "Bolder",
                "text": "APPLICATION LOGIN",
                "separator": true,
                "horizontalAlignment": "Center",
                "style": "heading",
                "fontType": "Default",
                "color": "Accent"
            },
            {
                "type": "Input.Text",
                "id": "userName",
                "label": "UserName",
                "spacing":"padding"
              },
              {
                "type": "Input.Text",
                "id": "myPassword",
                "label": "Password",
                "style": "password"
              }
        ],
        "actions": [
            {
              "type": "Action.Submit",
              "title": "Login",
              "spacing":"large"

            }
          ],
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.0",
        "fallbackText": "This card requires Adaptive Cards v1.2 support to be rendered properly."
    };

    var replyMsg=CardFactory.adaptiveCard(loginCard);

    await context.sendActivity({attachments:[replyMsg]});
}

module.exports.loginCard=loginCard;