
var messageApi = Vue.resource('/message{/id}');

Vue.component('message-row', {
    props : ['message'],
    template: '<div><i>({{ message.id }})</i> {{ message.text }}</div>'
});

// Определяем новый компонент под именем todo-item
Vue.component('messages-list', {
    props: ['messages'],
    template:
    '<div>' +
        '<message-row v-for="message in messages" :message="message"/>' +
    '</div>',
    created: function () {
        messageApi.get().then(result =>
            result.json().then(data =>
                data.forEach(message =>
                    this.messages.push(message))
            )
        )
    }
});

var app = new Vue({
    el: '#app',
    template: '<messages-list :messages="messages" />',
    data: {
        messages: []
    }
});