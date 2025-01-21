import amqp from 'amqplib' // Import the amqplib library to interact with RabbitMQ.

const queueName = 'simpleQueue' // Define the name of the queue to consume messages from.

const receiveMessage = async () => {
  // Step 1: Establish a connection to RabbitMQ server.
  const connection = await amqp.connect('amqp://localhost') // Connect to RabbitMQ running locally on the default port (5672).

  // Step 2: Create a channel for communication.
  const channel = await connection.createChannel() // A channel is used to send and receive messages.

  // Step 3: Ensure the queue exists before consuming messages.
  await channel.assertQueue(queueName, { durable: true })
  // `assertQueue` ensures that the queue named `simpleQueue` is present.
  // If it doesn't exist, RabbitMQ will create it.
  // The `durable: true` option ensures the queue survives a RabbitMQ server restart.

  channel.prefetch(1)
  // Step 4: Log that the consumer is ready and waiting for messages.
  console.log("----------------------")
  console.log(`[x] Waiting for messages in ${queueName}`)

  // Step 5: Consume messages from the queue.
  channel.consume(queueName, msg => {
    if (msg) {
      // Check if a message was received.
      console.log("----------------------")
      console.log(`[x] Received: ${msg.content.toString()}`) // Log the content of the message.

      // Simulate message processing time
      setTimeout(() => {
        channel.ack(msg) // Acknowledge the message after processing
        console.log(`[x] Processed and acknowledged`)
      }, 2000) // Simulating 2 seconds of processing
    }
  })
}

// Execute the `receiveMessage` function to start consuming messages.
receiveMessage()
