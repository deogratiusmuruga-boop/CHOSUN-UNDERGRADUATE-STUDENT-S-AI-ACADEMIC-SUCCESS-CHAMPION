"""
====================================================
Scholarship Recommendation Module
Member 3
English + Korean Comments
====================================================
"""

from typing import List


scholarships = [

    {
        "name": "Global Korea Scholarship",
        "country": "South Korea",
        "level": "Masters",
        "minimum_gpa": 3.0,
        "link": "https://www.studyinkorea.go.kr"
    },

    {
        "name": "Chevening Scholarship",
        "country": "United Kingdom",
        "level": "Masters",
        "minimum_gpa": 3.2,
        "link": "https://www.chevening.org"
    },

    {
        "name": "Fulbright Scholarship",
        "country": "USA",
        "level": "Masters",
        "minimum_gpa": 3.3,
        "link": "https://foreign.fulbrightonline.org"
    },

    {
        "name": "Erasmus Mundus",
        "country": "Europe",
        "level": "Masters",
        "minimum_gpa": 3.0,
        "link": "https://erasmus-plus.ec.europa.eu"
    }

]


def recommend_scholarships(
        gpa: float,
        level: str
) -> List[dict]:

    """
    English:
        Recommend scholarships.

    한국어:
        장학금을 추천합니다.
    """

    results = []

    for scholarship in scholarships:

        if scholarship["minimum_gpa"] <= gpa \
                and scholarship["level"].lower() == level.lower():

            results.append(scholarship)

    return results


if __name__ == "__main__":

    recommendations = recommend_scholarships(
        gpa=3.4,
        level="Masters"
    )

    for item in recommendations:
        print(item)