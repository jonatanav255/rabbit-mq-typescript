import amqp from 'amqplib'

const consumeLowPriorityTasks = async (consumerName: string) => {
  try {
    const url = 'amqp://guest:guest@localhost:5672/'
    const connection = await amqp.connect(url)
    console.log(`[${consumerName}] Connected to RabbitMQ`)

    const channel = await connection.createChannel()

    const exchangeName = 'task_exchange'
    await channel.assertExchange(exchangeName, 'direct', { durable: true })

    const queueName = 'low_priority_queue'
    await channel.assertQueue(queueName, { durable: true })

    const routingKey = 'low_priority'
    await channel.bindQueue(queueName, exchangeName, routingKey)
    console.log(`[${consumerName}] Bound to key: ${routingKey}`)

    console.log(`[${consumerName}] Waiting for messages in '${queueName}'...`)

    channel.consume(
      queueName,
      msg => {
        if (msg) {
          console.log(`[${consumerName}] Received: ${msg.content.toString()}`)
          channel.ack(msg) // Acknowledge message
        }
      },
      { noAck: false }
    )
  } catch (error) {
    console.error(`[${consumerName}] Error consuming tasks:`, error)
  }
}

consumeLowPriorityTasks('Consumer Low')
