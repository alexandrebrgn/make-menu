export default defineEventHandler(async () => {
    return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        message: 'MakeMenu API is running'
    }
})