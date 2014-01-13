schools <- read.csv("../datapackages/founders/data/schools.csv")
stanford <- schools$unicorns[schools$school=="Stanford"]
harvard <- schools$unicorns[schools$school=="Harvard"]
prop.test(stanford ,stanford + harvard, alternative="greater")
