from django.urls import include, path, re_path

from . import app_settings, views
from .api import api

app_name = 'altmanager'

urlpatterns = [
    re_path(r'^api/', api.urls),
    path('add_corp_token/', views.add_corp, name="add_corp"),
    path(
        'apply_corp/<int:corp_id>/<int:req_target_id>',
        views.claim_corp,
        name="claim_corp_target"
    ),
    path('apply_corp/<int:corp_id>', views.claim_corp, name="claim_corp_direct"),
    path('show/', views.react_redirect, name='base'),
    path('show/<int:cid>', views.react_main, name='report'),
    path('request', views.request_main, name='request'),
    path('sanctions', views.show_sanctions, name='sanctions'),
    path('manage', views.show_manage, name='manage'),
    path('detail/<int:corp_id>', views.alt_check, name='detail'),
    path(
        'revoke_sanction_corp/<int:corp_id>',
        views.sanction_revoke_corp,
        name='sanctions_approve'
    ),
    path('clear_revoke_corp/<int:corp_id>', views.sanction_clear_revoke_corp, name='revoke_clear'),
    path('delete_sanction_corp/<int:corp_id>', views.sanction_delete_corp, name='sanctions_delete'),
    path('sanction_corp/<int:corp_id>', views.sanction_approve_corp, name='sanctions_revoke'),
    path('approve_corp/<int:corp_id>', views.approve_corp, name='final_approve'),
]
