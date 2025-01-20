import amqp from 'amqplib'; // Import the RabbitMQ client library

const receiveMessages = async () => {
  try {
    // RabbitMQ connection URL
    const url = 'amqp://guest:guest@localhost:5672/';

    // Establish connection to RabbitMQ
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();

    const queueName = 'example';

    // Consume messages from the queue
    channel.consume(queueName, (msg) => {
      if (msg) {
        // console.log(msg)
        console.log('Message received:');
        console.log(`ID: ${msg.properties.messageId}`);
        console.log(`Timestamp: ${new Date(msg.properties.timestamp).toISOString()}`);
        console.log(`Body: ${msg.content.toString()}`);

        // Acknowledge the message
        channel.ack(msg);
      }
    });

    console.log(`Waiting for messages in queue: '${queueName}'`);
  } catch (error) {
    console.error('Error receiving messages:', error);
  }
};

// Execute the consumer function
receiveMessages();
