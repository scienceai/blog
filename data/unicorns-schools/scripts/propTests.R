schools <- read.csv("data_modules/unicorns/data/schools.csv")
stanford <- schools$Unicorns[schools$Schools=="Stanford"]
harvard <- schools$Unicorns[schools$Schools=="Harvard"]
prop.test(stanford ,stanford + harvard, alternative="greater")
