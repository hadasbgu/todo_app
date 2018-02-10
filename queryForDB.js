module.exports =
{
    /*get user data (names,school name,user type) by user identifier (id or email) and password*/
    getUserByNicknameOrEmail: function (user_identifier, password) {
        return "SELECT * FROM tododb.usertable " +
        "WHERE (nickname like " + user_identifier + " or email like " + user_identifier + ") " +
        " and pass like " + password + ";";
    },
    getUserByEmail: function (user_identifier, password) {
        return "SELECT * FROM tododb.usertable " +
        "WHERE email like " + user_identifier +
        " and pass like " + password + ";";
    },

    registerUser: function (Nickname, email, password) {
        return "insert into tododb.usertable values(" + 
        Nickname + ", "+ email + ", " + password + ");";
        },

    getAllTableByTableName: function(tableName){
    	return "SELECT * FROM tododb." + tableName;
    },

    getUserNameByEmail: function(userEmail){
        return "SELECT nickname FROM tododb.usertable WHERE email like " + userEmail
    },
    getUserTasksByEmail: function(userEmail){
        return "SELECT * FROM tododb.taskstable WHERE email like " + userEmail
    },
    addNewTaskByEmail: function(userEmail,status,item){
        return "INSERT INTO tododb.taskstable VALUES (UNIX_TIMESTAMP(NOW())," 
        + item + "," + userEmail + "," + status + ");"
        
    },
    deleteTaskByEmailAndTime: function(useremail,instanceTime){
        return "DELETE FROM tododb.taskstable WHERE (instanceTime like " + instanceTime + 
        " AND email like " + useremail + " );"
    }
};
