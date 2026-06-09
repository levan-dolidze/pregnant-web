import { PhoneFormaterPipe } from './phone-formater.pipe';

describe('PhoneFormaterPipe', () => {
  it('create an instance', () => {
    const pipe = new PhoneFormaterPipe();
    expect(pipe).toBeTruthy();
  });
});
