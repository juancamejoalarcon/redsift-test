const getIp = require("./get-ip");

const cases = [
    {
        authResult: 'mx.google.com; dkim=pass (test mode) header.i=@idealista.com header.s=id00a header.b=pR7YHALo; spf=pass (google.com: domain of noresponder@avisos.idealista.com designates 104.47.17.168 as permitted sender) smtp.mailfrom=noresponder@avisos.idealista.com spf=pass (sender IP is 62.97.67.92) smtp.mailfrom=avisos.idealista.com; hotmail.com; dkim=test (signature was verified) header.d=idealista.com;hotmail.com; dmarc=bestguesspass action=none header.from=avisos.idealista.com;compauth=pass reason=109',
        expected: '62.97.67.92'
    },
    {
        authResult: 'mx.google.com; spf=pass (google.com: domain of decidemadridinforma@madrid.es designates 104.47.17.176 as permitted sender) smtp.mailfrom=decidemadridinforma@madrid.es; dmarc=pass (p=NONE sp=NONE dis=NONE) header.from=madrid.es spf=pass (sender IP is 195.55.79.73) smtp.mailfrom=madrid.es; hotmail.com; dkim=none (message not signed) header.d=none;hotmail.com; dmarc=pass action=none header.from=madrid.es;compauth=pass reason=100',
        expected: '195.55.79.73'
    },
    {
        authResult: 'mx.google.com; dkim=pass (test mode) header.i=@idealista.com header.s=id00a header.b=pR7YHALo; spf=pass (google.com: domain of noresponder@avisos.idealista.com designates 104.47.17.168 as permitted sender) smtp.mailfrom=noresponder@avisos.idealista.com spf=pass (sender IP is 62.97.67.92) smtp.mailfrom=avisos.idealista.com; hotmail.com; dkim=test (signature was verified) header.d=idealista.com;hotmail.com; dmarc=bestguesspass action=none header.from=avisos.idealista.com;compauth=pass reason=109',
        expected: '62.97.67.92'
    },
    {
        authResult: 'mx.google.com; dkim=pass header.i=@quora.com header.s=pigeon header.b=ufWD2Ll8; spf=pass (google.com: domain of noreply@quora.com designates 54.174.14.137 as permitted sender) smtp.mailfrom=noreply@quora.com; dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=quora.com',
        expected: null
    },
  ]
  
  describe("should get IP address from string", () => {
    test.each(cases)(
      "case('%s') => %j",
      ({ authResult, expected }) => {
        expect(getIp(authResult)).toBe(expected);
      }
    );
  });