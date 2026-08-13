# ChineseHolidayCalendar SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ChineseHolidayCalendarUtility.registrar = ->(u) {
  u.clean = ChineseHolidayCalendarUtilities::Clean
  u.done = ChineseHolidayCalendarUtilities::Done
  u.make_error = ChineseHolidayCalendarUtilities::MakeError
  u.feature_add = ChineseHolidayCalendarUtilities::FeatureAdd
  u.feature_hook = ChineseHolidayCalendarUtilities::FeatureHook
  u.feature_init = ChineseHolidayCalendarUtilities::FeatureInit
  u.fetcher = ChineseHolidayCalendarUtilities::Fetcher
  u.make_fetch_def = ChineseHolidayCalendarUtilities::MakeFetchDef
  u.make_context = ChineseHolidayCalendarUtilities::MakeContext
  u.make_options = ChineseHolidayCalendarUtilities::MakeOptions
  u.make_request = ChineseHolidayCalendarUtilities::MakeRequest
  u.make_response = ChineseHolidayCalendarUtilities::MakeResponse
  u.make_result = ChineseHolidayCalendarUtilities::MakeResult
  u.make_point = ChineseHolidayCalendarUtilities::MakePoint
  u.make_spec = ChineseHolidayCalendarUtilities::MakeSpec
  u.make_url = ChineseHolidayCalendarUtilities::MakeUrl
  u.param = ChineseHolidayCalendarUtilities::Param
  u.prepare_auth = ChineseHolidayCalendarUtilities::PrepareAuth
  u.prepare_body = ChineseHolidayCalendarUtilities::PrepareBody
  u.prepare_headers = ChineseHolidayCalendarUtilities::PrepareHeaders
  u.prepare_method = ChineseHolidayCalendarUtilities::PrepareMethod
  u.prepare_params = ChineseHolidayCalendarUtilities::PrepareParams
  u.prepare_path = ChineseHolidayCalendarUtilities::PreparePath
  u.prepare_query = ChineseHolidayCalendarUtilities::PrepareQuery
  u.graphql_body = ChineseHolidayCalendarUtilities::GraphqlBody
  u.graphql_errors = ChineseHolidayCalendarUtilities::GraphqlErrors
  u.result_basic = ChineseHolidayCalendarUtilities::ResultBasic
  u.result_body = ChineseHolidayCalendarUtilities::ResultBody
  u.result_headers = ChineseHolidayCalendarUtilities::ResultHeaders
  u.transform_request = ChineseHolidayCalendarUtilities::TransformRequest
  u.transform_response = ChineseHolidayCalendarUtilities::TransformResponse
}
