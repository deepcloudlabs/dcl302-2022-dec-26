const {Kafka, Partitioners} = require("kafkajs");
const kafka = new Kafka({
    clientId: "hr-backend-producer",
    brokers: ["127.0.0.1:9092"]
});
const consumer = kafka.consumer({
    groupId: "hr-consumer"
});

consumer.connect()
    .then(() => {
        console.log("Connected to the Kafka broker successfully.");
        consumer.subscribe({topic: "hr-events", fromBeginning: true})
            .then(() => {
                consumer.run({
                    eachMessage: async ({topic, partition, message}) => {
                        console.log(`New event has arrived: ${message.value.toString()}`);
                    }
                })
            }).catch(err => console.error(err));
    }).catch(err => console.error(err));