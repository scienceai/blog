obesity <- read.csv('obesity.csv')

cor.test(obesity$ObesityRate,obesity$MinutesSpentEating)