obesity <- read.csv('OECD.csv')

test = cor.test(obesity$ObesityRate,obesity$MinutesSpentEating)

RJSONLD.export(test,'test.jsonld')