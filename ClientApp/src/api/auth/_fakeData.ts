import { AuthUser } from "./_types";

export const data: { [key: string]: AuthUser } = {
  'venkman': {
    forename: 'Peter',
    surname: 'Venkman',
    email: 'peter@ghostbusters.com',
    phone: '07770 111111',
    christieNumber: '12345678',
    postcode: 'AA11 1AA',
  },
  'stantz': {
    forename: 'Ray',
    surname: 'Stantz',
    email: 'ray@ghostbusters.com',
    phone: '07770 222222',
    christieNumber: '22222222',
    postcode: 'AA22 2AA',
  },
  'spengler': {
    forename: 'Egon',
    surname: 'Spengler',
    email: 'egon@ghostbusters.com',
    phone: '07770 333333',
    christieNumber: '33333333',
    postcode: 'AA33 3AA',
  },
};

export const tokens = {
  valid: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTExMTExMSIsIm5hbWUiOiJQZXRlciBWZW5rbWFuIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3OTk2MjY1Njh9.rzwkgXgilQCVF9ZAAgwW9gC3jKocCtr3AGMHuCNzKSI",
  expired: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTExMTExMSIsIm5hbWUiOiJQZXRlciBWZW5rbWFuIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE2NDA4NDE5NjB9.dr71bEswNkjPVzgx2BYlEcjx7qVdj-r3WrKRnNwQjpY",
};
