from django.urls import include, path, re_path

from . import app_settings, views
from .api import api

app_name = 'altmanager'

urlpatterns = [
    re_path(r'^api/', api.urls),

    # Alt Manager
    path('add_corp_token/', views.add_corp, name="add_corp_token"),
    path(
        'apply_corp/<int:entity_id>/<int:req_target_id>',
        views.claim_corp,
        name="claim_corp_target"
    ),
    path('show/', views.react_redirect, name='base'),
    path('show/<int:cid>', views.react_main, name='report'),

    # Base Views
    path('request', views.request_main, name='request'),
    path('sanctions', views.show_sanctions, name='sanctions'),
    path('manage', views.show_manage, name='manage'),

    # Alt Corp Urls
    path('detail/<int:entity_id>', views.alt_check, name='detail'),
    path('apply/<int:entity_id>/<str:entity_type>', views.claim_corp, name="claim_direct"),
    path(
        'revoke_sanction/<int:entity_id>',
        views.sanction_revoke_corp,
        name='sanctions_revoke'
    ),
    path('sanction/<int:entity_id>', views.sanction_approve_corp, name='sanctions_approve'),
    path('approve/<int:entity_id>', views.approve_corp, name='final_approve'),
    path('clear_revoke/<int:entity_id>', views.sanction_clear_revoke_corp, name='revoke_clear'),
    path('delete_sanction/<int:entity_id>', views.sanction_delete_corp, name='sanctions_delete'),
]
