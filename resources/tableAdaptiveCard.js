const { MessageFactory, CardFactory } = require("botbuilder");

async function tableAdaptiveCard(context,expenseList){
    
    var table={
        "type": "AdaptiveCard",
        "body": [
          {
            "type": "Container",
            "style": "warning",
            "items": [
              {
                "type": "ColumnSet",
                "columns": [
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "TextBlock",
                        "weight": "bolder",
                        "text": "EXPENSE NAME"
                      }
                    ],
                    "width": "auto"
                  },
                  {
                    "type": "Column",
                    "spacing": "large",
                    "items": [
                      {
                        "type": "TextBlock",
                        "weight": "bolder",
                        "text": "EXPENSE DESCRIPTION"
                      }
                    ],
                    "width": "stretch"
                  },
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "TextBlock",
                        "weight": "bolder",
                        "text": "EXPENSE PRICE"
                      }
                    ],
                    "width": "auto"
                  }
                ]
              }
            ],
            "bleed": true
          }              
        ],
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "version": "1.2",
        "fallbackText": "This card requires Adaptive Cards v1.2 support to be rendered properly."
      };
      expenseList.forEach(element => {
        table.body.push(
            {
                "type": "ColumnSet",
                "style": "good",
                "columns": [
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "TextBlock",
                        "text": element.expenseName
                      }
                    ]
                  },
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "TextBlock",
                        "text": element.expenseDescription,
                        "wrap":true
                      }
                    ]
                  },
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "TextBlock",
                        "text": String(element.expensePrice)
                      }
                    ]
                  }
                ]
              }
            // {
            //     "type": "Container",
            //     "spacing": "large",
            //     "items": [
            //       {
            //         "type": "ColumnSet",
            //         "columns": [
            //           {
            //             "type": "Column",
            //             "items": [
            //               {
            //                 "type": "TextBlock",
            //                 "text": element.expenseName,
            //                 "wrap": true
            //               }
            //             ],
            //             "width": "auto"
            //           },
            //           {
            //             "type": "Column",
            //             "spacing": "medium",
            //             "items": [
            //               {
            //                 "type": "TextBlock",
            //                 "text": element.expenseDescription,
            //                 "wrap": true
            //               }
            //             ],
            //             "width": "autp"
            //           },
            //           {
            //             "type": "Column",
            //             "items": [
            //               {
            //                 "type": "TextBlock",
            //                 "text": element.expensePrice,
            //                 "wrap": true
            //               }
            //             ],
            //             "width": "auto"
            //           }
            //         ]
            //       }
            //     ]
            //   }
        )
      });

    var replyTable=CardFactory.adaptiveCard(table);

    await context.sendActivity({attachments:[replyTable]});
}

module.exports.tableAdaptiveCard=tableAdaptiveCard;