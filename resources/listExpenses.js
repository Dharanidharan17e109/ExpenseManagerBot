const axios = require('axios');
require('dotenv').config();






async function listExpense(){
    var list=[]
    const token =process.env.BearerToken;
    //console.log(token)
    const config={
    headers:{"Authorization":`Bearer ${token}`,
            "Accept-Encoding":"gzip,deflate,compress"
        }
    }

    await axios.get("https://expensemanagerbackend.onrender.com/api/Expense",config)
                .then(response=>{
                    list=response.data;
                });
                return list;
}

module.exports.listExpense=listExpense;