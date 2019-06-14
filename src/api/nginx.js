export default {
  createNginxUpstream: {
    method: 'POST',
    url: `/api/v1/nginx/upstreams/{upstream_name}/add_node`,
  },
}
