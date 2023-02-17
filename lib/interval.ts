export default function createInterval(fps: number, callback: TimerHandler) {
  return setInterval(callback, 1000 / fps)
}
