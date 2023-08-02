export function mapping(inputData) {
    let self = this;
    if (inputData.consultations.length == 0) {
        // this.addFee()
    } else {
        inputData.consultations.forEach(element => {
            element['consultation_id'] = { consultation_id: element['consultation_id'], name: element['name'], id: element['consultation_id'] };
        });
    }

    if (inputData.categories.length == 0) {
        // this.addCategory()
    } else {
        let self = this;
        inputData.categories.forEach(obj => {
            // self.addCategory()
            obj.category = { id: null, name: null };
            obj.category.id = obj.category_id;
            obj.category.name = obj.category_name;
            obj.id = obj.id;
            obj.sub_categories.forEach(sObj => {
                sObj.id = sObj.sub_category_id;
                sObj.name = sObj.sub_category_name
            });
        });
    }

    inputData.user_categories = inputData.categories;
    inputData.consultation = inputData.consultations;

    inputData.faqs.forEach(element => {
        let qO = { id: element.faq_id, question: element.question, answer: element.answer }
        element.question = qO;
    });
    inputData.user_faq = inputData.faqs;
    console.log("getUser -> inputData.user_faq ", inputData.user_faq);
    return inputData;
}

export function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}