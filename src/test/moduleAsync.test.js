import { getVAT } from '../js/moduleAsync';


test('VAT foe Germany', async () => {
    const VAT = await getVAT('DE');
    expect(VAT).toBe(19);
});

