const getAuthResults = require("./get-auth-results");

const cases = [
    {
        authResult: 'mx.google.com; dkim=pass header.i=@quora.com header.s=pigeon header.b=BGgZS0nI; spf=pass (google.com: domain of noreply@quora.com designates 34.198.179.57 as permitted sender) smtp.mailfrom=noreply@quora.com; dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=quora.com',
        expected: {
            DMARC: 'pass',
            SPF: 'pass',
            DKIM: 'pass',
        }
    },
    {
        authResult: 'mx.google.com; dkim=pass header.i=@linkedin.com header.s=d2048-201806-01 header.b=HUulMzCr; dkim=pass header.i=@mailb.linkedin.com header.s=proddkim1024 header.b="OMG6g/x+"; spf=pass (google.com: domain of s-2ob1cmi2pvo6g2s3asqf6bh5hayf1metknyljdqv80v6q3f4p3q7jiuo@bounce.linkedin.com designates 2620:119:50c0:207::146 as permitted sender) smtp.mailfrom=s-2ob1cmi2pvo6g2s3asqf6bh5hayf1metknyljdqv80v6q3f4p3q7jiuo@bounce.linkedin.com; dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=linkedin.com',
        expected: {
            DMARC: 'pass',
            SPF: 'pass',
            DKIM: 'pass',
        }
    },
    {
        authResult: 'mx.google.com; dkim=pass header.i=@uber.com header.s=s2 header.b=hDd3wcXK; spf=softfail (google.com: domain of transitioning uber.espana@uber.com does not designate 104.47.1.58 as permitted sender) smtp.mailfrom=uber.espana@uber.com; dmarc=pass (p=QUARANTINE sp=QUARANTINE dis=NONE) header.from=uber.com spf=pass (sender IP is 167.89.42.166) smtp.mailfrom=em.uber.com; hotmail.com; dkim=pass (signature was verified) header.d=uber.com;hotmail.com; dmarc=pass action=none header.from=uber.com;compauth=pass reason=100',
        expected: {
            DMARC: 'pass',
            SPF: 'softfail',
            DKIM: 'pass',
        }
    },
    {
        authResult: 'mx.google.com; dkim=pass header.i=@uber.com header.s=s2 header.b=hDd3wcXK; spf=softfail (google.com: domain of transitioning uber.espana@uber.com does not designate 104.47.1.58 as permitted sender) smtp.mailfrom=uber.espana@uber.com; dmarc=pass (p=QUARANTINE sp=QUARANTINE dis=NONE) header.from=uber.com spf=pass (sender IP is 167.89.42.166) smtp.mailfrom=em.uber.com; hotmail.com; dkim=pass (signature was verified) header.d=uber.com;hotmail.com; dmarc=pass action=none header.from=uber.com;compauth=pass reason=100',
        expected: {
            DMARC: 'pass',
            SPF: 'softfail',
            DKIM: 'pass',
        }
    },
    {
        authResult: 'mx.google.com; dkim=pass (test mode) header.i=@idealista.com header.s=id00a header.b=hQwSoeZ7; spf=pass (google.com: domain of noresponder.avisos@idealista.com designates 62.97.67.93 as permitted sender) smtp.mailfrom=noresponder.avisos@idealista.com',
        expected: {
            DMARC: null,
            SPF: 'pass',
            DKIM: 'pass',
        }
    },
  ]
  
  describe("should return an object with DMARC, SPF, and DKIM values", () => {
    test.each(cases)(
      "case('%s') => %j",
      ({ authResult, expected }) => {
        expect(getAuthResults(authResult)).toEqual(expected);
      }
    );
  });