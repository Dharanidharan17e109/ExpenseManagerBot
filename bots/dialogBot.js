// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');
const { DialogAndWelcomeBot } = require('./dialogAndWelcomeBot');
const {sendSuggestActionCard} = require("../resources/sendSuggestedAction");
const { listExpense } = require('../resources/listExpenses');
const {tableAdaptiveCard} = require('../resources/tableAdaptiveCard');
const axios = require('axios');
const {loginCard}=require('../resources/loginCard');
const {createExpense}=require('../resources/createExpense');
require('dotenv').config();


const config={
    headers:{"Accept-Encoding":"gzip,deflate,compress"}
}



class DialogBot extends ActivityHandler {

    constructor() {
        super();
        this.onMessage(async (context, next) => {
            var token="";
            console.log(context.activity);
            if(context.activity.value!=null){
               if(context.activity.value.userName!=null){
                try {
                    var dataLogin={
                        UserName:context.activity.value.userName,
                        Password:context.activity.value.myPassword
                    }
                    const res = await axios.post('https://expensemanagerbackend.onrender.com/api/Auth/Login', dataLogin,{ 
                        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
                    })
                    console.log(`Status: ${res.status}`);
                    process.env['BearerToken']=res.data;
                    token=res.data;
                  } catch (err) {
                    token="Invalid Login";
                  }

                if(token!="Invalid Login"){
                  //  context.activity.text="Invalid Login";
                    await context.sendActivity("Login Success");
                    await sendSuggestActionCard(context);
                    
                }
                else{
                    await context.sendActivity("Invalid Login. Try Again");
                    await loginCard(context);
                }
               }
               else if(context.activity.value.ExpName!=null){
                try{
                    var expense={
                        expenseName: context.activity.value.ExpName,
                        expenseDescription: context.activity.value.Expdesc,
                        expensePrice:context.activity.value.Expprice 
                    };
                    const resPost = await axios.post('https://expensemanagerbackend.onrender.com/api/Expense', expense,{ 
                        headers: { "Authorization":`Bearer ${process.env['BearerToken']}`,"Accept-Encoding": "gzip,deflate,compress" } 
                    });
                    await context.sendActivity("Expense Created Successfully");
                    await sendSuggestActionCard(context);
                    console.log(resPost.status);
                }
                catch(err){
                    await context.sendActivity("Expense Creation Failed");
                }

               }            
            }
            var userAction=context.activity.text;
            console.log("user text",userAction);
            switch (userAction){
                case "ListExpense":                    
                    var expenseList=await listExpense();
                    await tableAdaptiveCard(context,expenseList);
                    await sendSuggestActionCard(context);
                    break;
                case "CreateExpense":
                    await createExpense(context);
                    break;
                case "Invalid Login":
                    await loginCard(context);
                    break;

                    
            }
           
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.DialogBot = DialogBot;
