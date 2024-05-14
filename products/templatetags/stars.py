from django import template

register = template.Library()


def create_stars(value):
    result = []
    while len(result) < 5 :
        if value >= 1 or value >= 0.8:
            result.append("fa-solid fa-star")
            value -= 1
        elif  0.3 <= value < 0.8:
            result.append("fa-solid fa-star-half-stroke")
            value -= 1
        else :
            result.append("fa-regular fa-star")
            value -= 1
    
    return result
        
register.filter("stars",create_stars)


def multiply(value,arg):
    return value * arg

register.filter("fois",multiply)