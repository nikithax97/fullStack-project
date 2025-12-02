import sys
import os
import pytest
from fastapi.testclient import TestClient

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from main import app  # now this will work

@pytest.fixture
def client():
    return TestClient(app)
