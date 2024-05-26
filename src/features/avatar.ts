async function generateHash(username: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(username);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function drawAvatar(username: string): Promise<HTMLCanvasElement> {
  const hash = await generateHash(username);

  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const colors = [
    `#${hash.slice(0, 6)}`,
    `#${hash.slice(6, 12)}`,
    `#${hash.slice(12, 18)}`,
    `#${hash.slice(18, 24)}`,
  ];
  const shapes = ['circle', 'square', 'triangle', 'hexagon'];
  const shape = shapes[parseInt(hash[0], 16) % shapes.length];

  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 4; i++) {
    const color = colors[i];
    const x = getRandomInt(20, 180);
    const y = getRandomInt(20, 180);
    const size = getRandomInt(20, 50);
    ctx.fillStyle = color;

    switch (shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'square':
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(x, y - size / 2);
        ctx.lineTo(x - size / 2, y + size / 2);
        ctx.lineTo(x + size / 2, y + size / 2);
        ctx.closePath();
        ctx.fill();
        break;
      case 'hexagon':
        const side = size / 2;
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          const angle = (Math.PI / 3) * j;
          ctx.lineTo(x + side * Math.cos(angle), y + side * Math.sin(angle));
        }
        ctx.closePath();
        ctx.fill();
        break;
    }
  }

  return canvas;
}

export default drawAvatar;
