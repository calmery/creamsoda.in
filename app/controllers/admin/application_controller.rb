# frozen_string_literal: true

class Admin::ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  before_action :authenticate

  def status(http_status_code)
    render status: http_status_code, body: nil
  end

  private

  def authenticate
    return true if Rails.env.test?

    authenticate_or_request_with_http_token do |t|
      ActiveSupport::SecurityUtils.secure_compare(t, ENV['ADMIN_AUTHORIZATION_TOKEN'] || '')
    end
  end
end