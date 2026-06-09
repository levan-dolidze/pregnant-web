import { CurrencySymbolPipe } from './currency-symbol-pipe.pipe';

describe('CurrencySymbolPipePipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencySymbolPipe();
    expect(pipe).toBeTruthy();
  });
});
