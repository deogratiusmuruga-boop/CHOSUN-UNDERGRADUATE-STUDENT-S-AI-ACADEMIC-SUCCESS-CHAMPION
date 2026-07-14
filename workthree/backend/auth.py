def get_current_user():
    class DummyUser:
        id = 1
        preferred_category = "AI"
    return DummyUser()
