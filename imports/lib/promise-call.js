export function callPromiseL(methodName, loading, ...args) {
    loading.set(true);  
    Tracker.flush();
    return new Promise((resolve, reject) => {
        Meteor.call(methodName, ...args, (error, result) => {
            if (error) reject(error)
            else{
                Meteor.setTimeout(function() {
                    loading.set(false);
                    resolve(result);
                }, 5000);                
            }
        })
    })
}