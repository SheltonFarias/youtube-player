import test from 'node:test';
import assert from 'node:assert/strict';
import { videoId, seconds, range } from './common.js';
test('aceita formatos de vídeo e rejeita domínios falsos', () => {
  for (const value of ['Vu4oXIRzx7w','https://youtu.be/Vu4oXIRzx7w?t=15','https://www.youtube.com/watch?v=Vu4oXIRzx7w','https://youtube.com/shorts/Vu4oXIRzx7w','https://youtube.com/embed/Vu4oXIRzx7w']) assert.equal(videoId(value), 'Vu4oXIRzx7w');
  for (const value of ['https://evil.com/watch?v=Vu4oXIRzx7w','https://youtube.com.evil.com/watch?v=Vu4oXIRzx7w','javascript:alert(1)','abc']) assert.throws(() => videoId(value));
});
test('interpreta tempos e valida o intervalo', () => {
  assert.equal(seconds('2:30'),150); assert.equal(seconds('1:02:30'),3750); assert.equal(seconds('1,5'),1.5);
  assert.deepEqual(range('2:30','3:10'),{start:150,end:190});
  for (const value of ['','-1','NaN','1:60','1:02:99','Infinity']) assert.throws(() => seconds(value));
  assert.throws(() => range(30,15)); assert.throws(() => range(30,30));
});
