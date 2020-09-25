module.exports = {

    age: function(timestamp) {

        const today = new Date()
        const birthDate = new Date(timestamp)
    
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth() 
    
        if (month < 0 ||
            (month == 0 &&
            today.getDate() <= birthDate.getDate())) {

                age = age - 1 
            }
    
        return age

    },

    date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2) 
        const day = `0${date.getUTCDate()}`.slice(-2) 

        return `${year}-${month}-${day}`
    },

    graduation: function(graduation) {

        let education_level = "";

        switch (graduation) {

            case "Secondary School":
                education_level = "Secondary School";
            break;

            case "Certificate":
                education_level = "Certificate"
            break;

            case "Diploma":
                education_level = "Diploma"
            break;

            case "Degree":
                education_level = "Degree"
            break;

            case "Master":
                education_level = "Master"
            break;

            default:
                break;     
        }
         
         return education_level
    }

}