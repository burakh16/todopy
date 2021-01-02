from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegistrationSerializer, UserSerializer
from .models import User


class UserRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.create_user(
            username=serializer.validated_data["username"], password=serializer.validated_data["password"], name=serializer.validated_data["name"])
        token = RefreshToken.for_user(user)
        return Response({'user': UserSerializer(user).data,
                         'refresh': str(token),
                         'access': str(token.access_token)
                         })


class GetUserView(APIView):

    def get(self, request):
        return Response(UserSerializer(request.user).data)
