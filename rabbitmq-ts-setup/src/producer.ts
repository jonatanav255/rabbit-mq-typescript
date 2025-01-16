import amqp from 'amqplib'; // Import the amqplib library to interact with RabbitMQ.

const queueName = 'simpleQueue'; // Define the name of the queue.

const sendMessage = async () => {
  // Step 1: Establish a connection to the RabbitMQ server
  const connection = await amqp.connect('amqp://localhost');

  // Step 2: Create a channel to communicate with RabbitMQ
  const channel = await connection.createChannel();

  // Step 3: Ensure the queue exists (create it if it doesn't)
  // The `durable: true` option makes the queue persistent across server restarts.
  await channel.assertQueue(queueName, { durable: true });

  // Step 4: Define the message to send
  const message = 'Hello, RabbitMQ';

  // Step 5: Send the message to the specified queue
  // The message is converted to a Buffer for binary data transmission.
  channel.sendToQueue(queueName, Buffer.from(message));

  // Step 6: Log confirmation that the message has been sent
  console.log(`[x] Sent: ${message}`);

  // Step 7: Close the connection after a short delay
  // The delay ensures the message is fully transmitted before closing.
  setTimeout(() => {
    connection.close(); // Close the RabbitMQ connection.
  }, 500);
};

// Run the function to send the message
sendMessage();
