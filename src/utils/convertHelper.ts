const secondsToHHMMSS = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor(totalSeconds % 60)
    //@ts-ignore
    const pad = (num) => String(num).padStart(2, '0')

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

export { secondsToHHMMSS }
