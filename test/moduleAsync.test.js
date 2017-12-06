import { getVAT } from 'js/moduleAsync';


test('VAT for Germany', async () => {
    const VAT = await getVAT('DE');
    expect(VAT).toBe(19);
});

