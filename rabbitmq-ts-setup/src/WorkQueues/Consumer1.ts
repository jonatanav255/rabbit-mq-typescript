import amqp from 'amqplib'

const consumeTask = async (consumerName: string) => {
  try {
    const url = 'amqp://guest:guest@localhost:5672/'
    const connection = await amqp.connect(url)

    console.log(`[${consumerName}] Connected to Rabbit MQ`)

    const channel = await connection.createChannel()

    
  } catch (error) {}
}
