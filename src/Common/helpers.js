let SERVER_API = "https://uxcandy.com/~shapoval/test-task-backend/v2/";
const TIMEOUT = 10000;
export const Fetchs = async (url, data, method, token, cb) => {
 let result;
 url = url+'?developer=Maksat';
 if (method !== "GET") {
    const form = new FormData();
    let keys = Object.keys(data);
   for (let i = 0; i < keys.length; i++) {
     form.append(keys[i], data[keys[i]]);
   }
    result = await fetch(SERVER_API + url, {
     method: method,
     body: form
   }, TIMEOUT)
     .then((data) => {
       return data.json();
     })
     .catch((err) => {
       console.log(err);
       return {
         error: true,
         body: {
           en: "Couldn't get data from server",
           ru: "Невозможно получить данные с сервера",
         },
       };
     });
 } else {
   let query = new URL(SERVER_API + url);
   let keys = Object.keys(data);
   for (let i = 0; i < keys.length; i++) {
     query.searchParams.append(keys[i], data[keys[i]]);
   }
   result = await fetch(query, {
     mode: "cors",
     method: method,
   },TIMEOUT)
     .then((data) => {
       return data.json();
     })
     .catch((err) => {
       console.log(err);
       return {
         error: true,
         body: {
            en: "Couldn't get data from server",
           ru: "Невозможно получить данные с сервера",
         },
       };
     });
 }
 console.log(
   "\n\tURL    ->  " + SERVER_API + url,
   "\n",
   "\tBODY   ->  ",
   data,
   "\n",
   "\tMETHOD ->  ",
   method,
   "\n",
   "\tTOKEN  ->  ",
   token,
   "\n\t---------------------------------------------------------------------------------------------------------\n",
   "\tRESULT <-  ",
   result,
   "\n",
   "\n"
 );
 cb(result);
};


var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export const isEmailValid = (email) => {
    if (!email)
        return false;

    if(email.length>254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}